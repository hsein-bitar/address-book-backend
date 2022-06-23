"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const ContactSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    relation: {
        type: String,
        required: true
    },
    location: {
        type: { type: String },
        coordinates: []
    },
}, { timestamps: true });
ContactSchema.index({ "location": "2dsphere" });
const ContactModel = (0, mongoose_1.model)('ContactModel', ContactSchema, 'contacts');
exports.default = ContactModel;
