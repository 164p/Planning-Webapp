export async function GET() {
    const res = await fetch('https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJzwxgI7C0AjERShi5dyiRcJI&key=AIzaSyD9YrY4EzXon6_8L-AdvEhYcV2uh_GdFxs')
    const data = await res.json()

    return Response.json({ data })
  }