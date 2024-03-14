import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = <T>(user: T) => {

    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const token = jwt.sign(
        { data: user },
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