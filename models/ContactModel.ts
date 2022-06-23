import { Types, Document, Schema, model } from 'mongoose';

interface Contact extends Document {
    user_id: Types.ObjectId;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    relation: string;
    location: Object;
};

const ContactSchema = new Schema<Contact>({
    user_id: {
        type: Schema.Types.ObjectId,
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
}, { timestamps: true })

ContactSchema.index({ "location": "2dsphere" });

const ContactModel = model<Contact>('ContactModel', ContactSchema, 'contacts');
export default ContactModel;

