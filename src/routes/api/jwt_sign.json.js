import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const post = async ({ params, request }) => {
    var b = await request.json()

    let t = jwt.sign(b.payload, process.env.JWT_SECRET, {
        expiresIn: '12h',
    });

    return {
        status: 200,
        body: {
            jwt: t
        }
    }
}