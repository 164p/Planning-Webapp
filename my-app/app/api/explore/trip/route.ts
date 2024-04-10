export async function GET() {
    const place = [
        {
            "name": "บางแสนบางใจ",
            "img": "/bangsan1.jpg",
            "rating": 5,
            "cost": 20000,
            "provincetag": "ชลบุรี",
            "activitytag": "ดำน้ำ",
            "typetag": "ทะเล",
        },
        {
            "name":"ชะอำ",
            "img": "/bangsan.jpg",
            "rating": 4,
            "cost": 10000,
            "provincetag": "ชลบุรี",
            "activitytag": "ดำน้ำ",
            "typetag": "ทะเล"
        },
        {
            "name": "บางแสนนน",
            "img": "/beach2.jpg",
            "rating": 4,
            "cost": 5000,
            "provincetag": "ชลบุรี",
            "activitytag": "ดำน้ำ",
            "typetag": "ทะเล",
        },
        {
            "name": "กระบี่",
            "img": "/beach1.jpg",
            "rating": 5,
            "cost": 30000,
            "provincetag": "กระบี่",
            "activitytag": "ดำน้ำ",
            "typetag": "ทะเล",
        },
    ];
    return Response.json({place})
}