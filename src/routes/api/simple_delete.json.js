import { connectToDatabase } from '$lib/db.js';
import { ObjectId } from 'mongodb'

export const post = async ({ params, request }) => {
    var b = await request.json()
    console.log(b)
    let dbTest = await connectToDatabase();
    console.log(dbTest.db)

    if (b.regex._id) b.regex._id = new ObjectId(b.regex._id)

    var c = await dbTest.db.collection(b.collection).deleteOne(b.regex)

    let response = {
        status: c ? true : false,
        msg: c ? "Values updated successfully!" : "Database had an error/returned nothing.",
        data: c
    }
    console.log(response)
    return {
        status: 200,
        body: response
    }
}