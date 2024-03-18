import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = (userId: any) => {

    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const token = jwt.sign(
        { userId },
        tokenSecret as string,
        {
            expiresIn: "30 min"
        }
    );

    return token
}

export const verifyAccessToken = <T>(token: T) => {
    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
    return jwt.verify(String(token), tokenSecret as string)
}