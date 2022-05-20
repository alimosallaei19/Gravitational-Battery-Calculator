import { connectToDatabase } from '$lib/db.js';

export const post = async ({ params, request }) => {
    var b = await request.json()
    console.log(b)
    let dbTest = await connectToDatabase();
    console.log(dbTest.db)

    var c = await dbTest.db.collection(b.collection).insertOne(b.items)

    let response = {
        status: c ? true : false,
        msg: c ? "Values saved successfully!" : "Database had an error/returned nothing.",
        data: c
    }
    console.log(response)
    return {
        status: 200,
        body: response
    }
}