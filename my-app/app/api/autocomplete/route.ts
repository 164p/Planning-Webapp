export async function GET() {
    const res = await fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=amoeba&location=37.76999%2C-122.44696&radius=500&types=establishment&key=AIzaSyC6LYgvdJqZ0QLoJXA7XKLHuaqPPzLY1Ac')
    const data = await res.json()
   
    return Response.json({ data })
  }