export async function GET() {
    const place = [
        {
            "name": "บางแสนบางใจ",
            "img": "/mockupimg.jpg",
            "rating": 4,
            "cost": 10000,
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
            "cost": 10000,
            "provincetag": "กทม",
            "activitytag": "ดำน้ำ",
            "typetag": "ทะเล",
        },
        {
            "name": "บางแสนบางใจ",
            "img": "/mockupimg.jpg",
            "rating": 4,
            "cost": 10000,
            "provincetag": "กทม",
            "activitytag": "ดำน้ำ",
            "typetag": "ทะเล",
        },
    ];
    return Response.json({place})
}