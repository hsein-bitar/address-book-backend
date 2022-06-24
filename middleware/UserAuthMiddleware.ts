const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from "jsonwebtoken";
import ContactModel from '../models/ContactModel';


// export interface RequestWithData extends Request {
//     user: string | JwtPayload
// }

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).send("Access denied.");

        const decoded = verify(token, TOKEN_SECRET);
        res.locals.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};


// not needed I guess
// export const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.header("x-auth-token");
//         if (!token) return res.status(403).send("Access denied.");

//         const contact = await ContactModel.findOne({ _id: req.body.target_id });
//         if (!contact) {
//             throw new Error('Could not retrieve owner')
//         }

//         const decoded: any = verify(token, TOKEN_SECRET);
//         if (contact.user_id !== decoded._id) return res.status(403).send("Not Authorized.");

//         console.log('target_owner_id', target_owner_id)
//         console.log('decoded._id', decoded._id)
//         next();
//     } catch (error) {
//         res.status(400).send("Invalid token");
//     }
// };

