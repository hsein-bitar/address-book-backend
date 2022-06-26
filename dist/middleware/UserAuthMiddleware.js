"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const jsonwebtoken_1 = require("jsonwebtoken");
const isLoggedIn = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(403).json({ message: "Access denied." });
        const decoded = (0, jsonwebtoken_1.verify)(token, TOKEN_SECRET);
        res.locals.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};
exports.isLoggedIn = isLoggedIn;
