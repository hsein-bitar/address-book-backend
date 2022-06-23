import { Types, Document, Schema, model } from 'mongoose';

export interface User extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    // avatar: string;
};


const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
    // avatar: {
    //     type: String,
    //     required: true,
    // }
})

const UserModel = model<User>('UserModel', UserSchema, 'users'); //third argument lets us force a name for the collection
export default UserModel;

