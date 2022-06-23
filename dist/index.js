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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// model imports
const UserModel_1 = __importDefault(require("./models/UserModel"));
const ContactModel_1 = __importDefault(require("./models/ContactModel"));
// routers/controllers imports
const UserController_1 = __importDefault(require("./controllers/UserController"));
// get a database connection instance
const DB_CONNECT = process.env.DB_CONNECT;
mongoose_1.default.connect(DB_CONNECT)
    .then(res => console.log("DB conencted, model names: ", res.modelNames()))
    .catch(err => console.log(err));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// grouping routes
app.use('/user', UserController_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// TODO check this
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new UserModel_1.default({
            first_name: 'Bill',
            last_name: 'Smith',
            email: 'bill@initech.com',
            password: '123456',
        });
        let save_user = yield user.save();
        console.log("save_user", save_user);
        const contact = new ContactModel_1.default({
            // user_id: '62b47b59f25558bc2f8b4eed',
            user_id: '62b47b59f25558bc2f8b4eed',
            first_name: 'Bill',
            last_name: 'Smith',
            phone: '123456',
            email: 'billff@initech.com',
            relation: 'friend',
            location: {
                type: "Point",
                coordinates: [180, 90]
            },
        });
        let save_contact = yield contact.save();
        console.log("save_contact", save_contact);
        const res = yield ContactModel_1.default.
            find({ user_id: '62b47b59f25558bc2f8b4eed' }).
            populate('user_id').
            exec(function (err, contacts) {
            if (err) {
                console.log(err);
            }
            console.log('The user is %s', JSON.stringify(contacts));
        });
    });
}
// start server
app.listen(process.env.PORT, () => {
    console.log(`🚀🚀 Server is running at https://localhost:${process.env.PORT}`);
});
// run();
