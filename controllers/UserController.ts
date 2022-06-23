const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
import { Router, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import UserModel from '../models/UserModel';
const UserController = Router();




// start user controller routes section
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
            { _id: saved_user._id, first_name: saved_user.first_name, last_name: saved_user.last_name, email: saved_user.email },
            TOKEN_SECRET
        );
        return res.header('auth-token', token).send(token);
    } catch (error) {
        console.log(error);
    }
})

UserController.post('/login', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('invalid credentials');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('invalid credentials');

        const token = jwt.sign(
            { _id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email },
            TOKEN_SECRET
        );
        return res.header('auth-token', token).send(token);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})



export default UserController;