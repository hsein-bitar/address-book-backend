"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const UserSchema = new mongoose_1.Schema({
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
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
    // avatar: {
    //     type: String,
    //     required: true,
    // }
});
const UserModel = (0, mongoose_1.model)('UserModel', UserSchema, 'users'); //third argument lets us force a name for the collection
exports.default = UserModel;
