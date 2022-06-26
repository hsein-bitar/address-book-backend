"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// routers/controllers imports
const UserController_1 = __importDefault(require("./controllers/UserController"));
const ContactController_1 = __importDefault(require("./controllers/ContactController"));
// get a database connection instance
const DB_CONNECT = process.env.DB_CONNECT;
mongoose_1.default.connect(DB_CONNECT, {
    autoIndex: true,
})
    .then(res => console.log("DB conencted, model names: ", res.modelNames()))
    .catch(err => console.log(err));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// grouping routes
app.use('/api/user', UserController_1.default);
app.use('/api/contact', ContactController_1.default);
// start server
app.listen(process.env.PORT, () => {
    console.log(`🚀🚀🚀 Server is running at https://localhost:${process.env.PORT}`);
});
