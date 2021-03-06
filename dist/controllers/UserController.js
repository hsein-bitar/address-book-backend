"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
// start user controller routes section
const UserController = (0, express_1.Router)();
UserController.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
        const { first_name, last_name, email } = req.body;
        const user = new UserModel_1.default({
            first_name,
            last_name,
            email,
            password: hashPassword
        });
        const saved_user = yield user.save();
        const token = jsonwebtoken_1.default.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 200),
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }, TOKEN_SECRET);
        return res.status(200).header('x-auth-token', token).json(token);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
}));
UserController.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).json('invalid credentials');
        const validPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).json('invalid credentials');
        const token = jsonwebtoken_1.default.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 200),
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }, TOKEN_SECRET);
        return res.status(200).header('x-auth-token', token).json(token);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
}));
exports.default = UserController;
