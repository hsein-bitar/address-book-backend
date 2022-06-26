const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
import { Request, Response, NextFunction } from 'express';
import { verify } from "jsonwebtoken";



export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).json({ message: "Access denied." })

        const decoded = verify(token, TOKEN_SECRET);
        res.locals.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" })
    }
};