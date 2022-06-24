"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const jsonwebtoken_1 = require("jsonwebtoken");
// export interface RequestWithData extends Request {
//     user: string | JwtPayload
// }
const isLoggedIn = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(403).send("Access denied.");
        const decoded = (0, jsonwebtoken_1.verify)(token, TOKEN_SECRET);
        res.locals.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).send("Invalid token");
    }
};
exports.isLoggedIn = isLoggedIn;
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
