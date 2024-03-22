import { useState, useEffect } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-boundary-canvas";
import L from "leaflet";

const position = [22.9074872, 79.07306671];
const mapStyle = { height: "100vh" };
const data = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "IND",
      properties: {
        name: "India"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [80.286294, 13.006261],
            [79.862547, 12.056215],
            [79.857999, 10.357275],
            [79.340512, 10.308854],
            [78.885345, 9.546136],
            [79.18972, 9.216544],
            [78.277941, 8.933047],
            [77.941165, 8.252959],
            [77.539898, 7.965535],
            [76.592979, 8.899276],
            [76.130061, 10.29963],
            [75.746467, 11.308251],
            [75.396101, 11.781245],
            [74.864816, 12.741936],
            [74.616717, 13.992583],
            [74.443859, 14.617222],
            [73.534199, 15.990652],
            [73.119909, 17.92857],
            [72.820909, 19.208234],
            [72.824475, 20.419503],
            [72.630533, 21.356009],
            [71.175273, 20.757441],
            [70.470459, 20.877331],
            [69.16413, 22.089298],
            [69.644928, 22.450775],
            [69.349597, 22.84318],
            [68.176645, 23.691965],
            [68.842599, 24.359134],
            [71.04324, 24.356524],
            [70.844699, 25.215102],
            [70.282873, 25.722229],
            [70.168927, 26.491872],
            [69.514393, 26.940966],
            [70.616496, 27.989196],
            [71.777666, 27.91318],
            [72.823752, 28.961592],
            [73.450638, 29.976413],
            [74.42138, 30.979815],
            [74.405929, 31.692639],
            [75.258642, 32.271105],
            [74.451559, 32.7649],
            [74.104294, 33.441473],
            [73.749948, 34.317699],
            [74.240203, 34.748887],
            [75.757061, 34.504923],
            [76.871722, 34.653544],
            [77.837451, 35.49401]
          ]
        ]
      }
    }
  ]
};
export default function Map() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;

    const fetchGeoJSON = async () => {
      // const response = await fetch(
      //   "https://cdn.rawgit.com/johan/world.geo.json/34c96bba/countries/IND.geo.json"
      // );
      const geoJSON = data;
      const osm = L.TileLayer.BoundaryCanvas(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          boundary: geoJSON,
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>'
        }
      );
      map.addLayer(osm);
      const ukLayer = L.geoJSON(geoJSON);
      map.fitBounds(ukLayer.getBounds());
    };

    fetchGeoJSON();
  }, [map]);

  return (
    <MapContainer
      center={[22.9074872, 79.07306671]}
      zoom={13}
      style={mapStyle}
          />
  );
}
