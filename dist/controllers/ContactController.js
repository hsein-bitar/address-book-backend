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
const UserAuthMiddleware_1 = require("../middleware/UserAuthMiddleware");
const ContactModel_1 = __importDefault(require("../models/ContactModel"));
// start contact controller routes section
const ContactController = (0, express_1.Router)();
ContactController.post('/addcontact', UserAuthMiddleware_1.isLoggedIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(res.locals.user._id)
        const contact = new ContactModel_1.default({
            user_id: res.locals.user._id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            relation: req.body.relation,
            location: req.body.location,
        });
        const saved_contact = yield contact.save();
        // console.log("saved_contact is: \n", saved_contact)
        return res.json(saved_contact);
    }
    catch (error) {
        console.log(error);
    }
}));
ContactController.put('/updatecontact', UserAuthMiddleware_1.isLoggedIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query_result = yield ContactModel_1.default.updateOne({
            _id: req.body.target_id,
            user_id: res.locals.user._id
        }, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            relation: req.body.relation,
            location: req.body.location,
        });
        if (query_result.matchedCount === 0)
            return res.status(403).json({ message: "Could not find contact." });
        if (query_result.modifiedCount === 0)
            return res.status(403).json({ message: "Contact found but could not be updated." });
        return res.status(200).json({ message: "Contact is updated." });
    }
    catch (error) {
        return res.status(500).json({ message: "Contact is updated." });
    }
}));
ContactController.delete('/deletecontact', UserAuthMiddleware_1.isLoggedIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query_result = yield ContactModel_1.default.deleteOne({
            _id: req.body.target_id,
            user_id: res.locals.user._id
        });
        console.log(query_result);
        if (query_result.deletedCount === 0)
            return res.status(403).json({ message: "Failed to delete contact." });
        return res.status(200).json({ message: "Contact is deleted." });
    }
    catch (error) {
        console.log(error);
    }
}));
ContactController.get('/listcontacts', UserAuthMiddleware_1.isLoggedIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query_result = yield ContactModel_1.default.find({
            user_id: res.locals.user._id
        });
        return res.status(200).json(query_result);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = ContactController;
