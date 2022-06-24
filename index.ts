import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();

// model imports
import UserModel from './models/UserModel'
import ContactModel from './models/ContactModel'

// routers/controllers imports
import UserController from './controllers/UserController';
import ContactController from './controllers/ContactController';


// get a database connection instance
const DB_CONNECT = process.env.DB_CONNECT;
mongoose.connect(DB_CONNECT)
    .then(res => console.log("DB conencted, model names: ", res.modelNames()))
    .catch(err => console.log(err))



const app: Express = express();
app.use(cors())
app.use(express.json())

// grouping routes
app.use('/api/user', UserController);
app.use('/api/contact', ContactController);


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// TODO this works
// async function run() {
//     const user = new UserModel({
//         first_name: 'Bill',
//         last_name: 'Smith',
//         email: 'bill@initech.com',
//         password: '123456',
//     });
//     let save_user = await user.save();
//     console.log("save_user", save_user);


//     const contact = new ContactModel({
//         // user_id: '62b47b59f25558bc2f8b4eed',
//         user_id: '62b47b59f25558bc2f8b4eed',
//         first_name: 'Bill',
//         last_name: 'Smith',
//         phone: '123456',
//         email: 'billff@initech.com',
//         relation: 'friend',
//         location: {
// type: "Point",
// coordinates: [180, 90]
//         },
//     });
//     let save_contact = await contact.save();
//     console.log("save_contact", save_contact);


//     const res = await ContactModel.
//         find({ user_id: '62b47b59f25558bc2f8b4eed' }).
//         populate('user_id').
//         exec(function (err, contacts) {
//             if (err) { console.log(err); }
//             console.log('The user is %s', JSON.stringify(contacts));
//         })
// }


// start server
app.listen(process.env.PORT, () => {
    console.log(`🚀🚀 Server is running at https://localhost:${process.env.PORT}`);
});

// run();