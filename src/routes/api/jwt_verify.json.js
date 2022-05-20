import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const post = async ({ params, request }) => {
    var b = await request.json()

    try {
        let u = await jwt.verify(b.token, process.env.JWT_SECRET)
        return {
            status: 200,
            body: u
        }
    } catch (e) {
        return {
            status: 200,
            body: e
        }
    }
}