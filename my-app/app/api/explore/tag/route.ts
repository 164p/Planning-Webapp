export async function GET() {
    const tag = [
        {
            "provincetag": ["กทม",'เชียงใหม่','ฮ่องกง']
        },
        {
            "activitytag": ["ทะเล",'ภูเขา','กิจกรรม'],
        },
        {
            "typetag": ["ร้านอาหาร",'ทีพัก','สวนสนุก'],
        }
    ]
    return Response.json({tag})
  }