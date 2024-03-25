import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Response } from 'express';
import dotenv from "dotenv";
dotenv.config();

interface DecodedToken {
    expiresIn?: number;
    [secretKey: string]: any;
}

interface Result { 
    valid: boolean; 
    reason?: string 
}

export const generateAccessToken = (userId: any) => {

    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
    // Openssl rand -base64 32
    const token = jwt.sign(
        { userId },
        tokenSecret as string,
        {
            expiresIn: "30 min"
        }
    );

    return token
}

export const verifyAccessToken = <T>(token: T, res: Response) => {
    if(!token || token == null) {
        return res.status(401).json({
            status: "Unauthorized",
            message: "Unauthorized, Please login to continue!"
        })
    }
    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
    return jwt.verify(String(token), tokenSecret as string)
}

export function validateToken(token: string | undefined, secretKey: string ): Result {
    try {
        if (!token) {
            return { valid: false, reason: 'Unauthorized, Please login to continue!' };
        }

        const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

        if (decodedToken) return { valid: true }

        return { valid: true };
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return { valid: false, reason: 'Unauthorized, Please login to continue!' };
        } else {
            return { valid: false, reason: 'Unexpected error, Please login to continue!' };
        }
    }
}