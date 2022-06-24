const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
import { Router, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import UserModel from '../models/UserModel';




// start user controller routes section
const UserController = Router();

UserController.post('/register', async (req: Request, res: Response) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const {
            first_name,
            last_name,
            email
        } = req.body;

        const user = new UserModel({
            first_name,
            last_name,
            email,
            password: hashPassword
        });
        const saved_user = await user.save();
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 200),
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            },
            TOKEN_SECRET
        );
        return res.status(200).header('x-auth-token', token).json(token);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
})

UserController.post('/login', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).json('invalid credentials');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json('invalid credentials');

        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 200),
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            },
            TOKEN_SECRET
        );
        return res.status(200).header('x-auth-token', token).json(token);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
})

export default UserController;