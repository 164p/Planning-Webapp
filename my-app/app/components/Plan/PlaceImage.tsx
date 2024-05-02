function blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

export default async function PlaceImages(props: any) {
    await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.Id}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`)
    return (
        <>
        </>
    )
}