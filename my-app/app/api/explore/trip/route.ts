export async function GET() {
    const place = [
        {
            "name": "บางแสนบางใจ",
            "img": "/mockupimg.jpg",
            "rating": 2,
            "cost": 20000,
            "provincetag": "กทม",
            "activitytag": "ดำน้ำ",
            "typetag": "ทะเล",
        },
        {
            "name":"ชะอ้ำ",
            "img": "/mockupimg.jpg",
            "rating": 4,
            "cost": 10000,
            "provincetag": "ฮ่องกง",
            "activitytag": "ดำน้ำ",
            "typetag": "ทะเล"
        },
        {
            "name": "บางแสนบางใจ",
            "img": "/mockupimg.jpg",
            "rating": 4,
            "cost": 5000,
            "provincetag": "กทม",
            "activitytag": "ดำน้ำ",
            "typetag": "ทะเล",
        },
        {
            "name": "กก",
            "img": "/mockupimg.jpg",
            "rating": 3,
            "cost": 30000,
            "provincetag": "กทม",
            "activitytag": "ดำน้ำ",
            "typetag": "ทะเล",
        },
    ];
    return Response.json({place})
}