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
const express_1 = require("express");
const user_model_1 = __importDefault(require("../models/user.model"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    ;
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let allUsers = yield user_model_1.default.find();
            res.json({ Message: 'List of Users', allUsers });
        });
    }
    ;
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userUrl = yield user_model_1.default.findOne({ username: req.params.username }).populate('posts -_id');
            res.json({ Message: 'User Find', userUrl });
        });
    }
    ;
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser = new user_model_1.default(req.body);
            yield newUser.save();
            res.json({ Message: 'User Created', newUser });
        });
    }
    ;
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username } = req.params;
            let userUpdated = yield user_model_1.default.findOneAndUpdate({ username }, req.body, { new: true });
            res.json({ Message: 'User Updated', userUpdated });
        });
    }
    ;
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username } = req.params;
            yield user_model_1.default.findOneAndDelete({ username });
            res.json({ Message: 'User Deleted' });
        });
    }
    ;
    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
    ;
}
;
let userRoutes = new UserRoutes();
exports.default = userRoutes.router;
