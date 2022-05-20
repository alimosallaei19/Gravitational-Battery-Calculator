import { connectToDatabase } from '$lib/db.js';

export const post = async ({ params, request }) => {
    var b = await request.json()
    console.log(b)
    let dbTest = await connectToDatabase();
    console.log(dbTest.db)

    if (b.regex._id && !b.hold) b.regex._id = new ObjectId(b.regex._id)

    var c = await dbTest.db.collection(b.collection).find(b.regex).toArray()

    let response = {
        status: c ? true : false,
        msg: c ? "Database returned something!" : "Database had an error/returned nothing.",
        data: c
    }

    return {
        status: 200,
        body: response
    }
}