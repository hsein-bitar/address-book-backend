const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
import { Router, Request, Response, RequestHandler } from "express";

import { isLoggedIn } from "../middleware/UserAuthMiddleware";



import ContactModel from '../models/ContactModel';


// start contact controller routes section
const ContactController = Router();

ContactController.post('/addcontact', isLoggedIn, async (req: Request, res: Response) => {
    try {
        // console.log(res.locals.user._id)
        const contact = new ContactModel({
            user_id: res.locals.user._id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            relation: req.body.relation,
            location: req.body.location,
        });
        const saved_contact = await contact.save();
        // console.log("saved_contact is: \n", saved_contact)
        return res.json(saved_contact);
    } catch (error) {
        console.log(error);
    }
})
ContactController.put('/updatecontact', isLoggedIn, async (req: Request, res: Response) => {
    try {
        const query_result = await ContactModel.updateOne({
            _id: req.body.target_id,
            user_id: res.locals.user._id
        },
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                email: req.body.email,
                relation: req.body.relation,
                location: req.body.location,
            });
        if (query_result.matchedCount === 0) return res.status(403).json({ message: "Could not find contact." })
        if (query_result.modifiedCount === 0) return res.status(403).json({ message: "Contact found but could not be updated." })
        return res.status(200).json({ message: "Contact is updated." });
    } catch (error) {
        return res.status(500).json({ message: "Contact is updated." });
    }
})
ContactController.delete('/deletecontact', isLoggedIn, async (req: Request, res: Response) => {
    try {
        const query_result = await ContactModel.deleteOne({
            _id: req.body.target_id,
            user_id: res.locals.user._id
        });
        console.log(query_result);
        if (query_result.deletedCount === 0) return res.status(403).json({ message: "Failed to delete contact." })
        return res.status(200).json({ message: "Contact is deleted." })
    } catch (error) {
        console.log(error);
    }
})

ContactController.get('/listcontacts', isLoggedIn, async (req: Request, res: Response) => {
    try {
        const query_result = await ContactModel.find({
            user_id: res.locals.user._id
        });
        return res.status(200).json(query_result);
    } catch (error) {
        console.log(error);
    }
})

export default ContactController;