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
const post_model_1 = __importDefault(require("../models/post.model"));
class PostRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    ;
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let allPosts = yield post_model_1.default.find();
            res.json({ Menssage: 'List of Post', allPosts });
        });
    }
    ;
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let postUrl = yield post_model_1.default.findOne({ url: req.params.url });
            res.json({ Menssage: 'Post Find', postUrl });
        });
    }
    ;
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let newPost = new post_model_1.default(req.body);
            yield newPost.save();
            res.json({ Message: 'Post Created', newPost });
        });
    }
    ;
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { url } = req.params;
            let postUpdated = yield post_model_1.default.findOneAndUpdate({ url }, req.body, { new: true });
            res.json({ Menssage: 'Post Updated', postUpdated });
        });
    }
    ;
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { url } = req.params;
            yield post_model_1.default.findOneAndDelete({ url });
            res.json({ Message: 'Post Deleted' });
        });
    }
    ;
    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
    ;
}
;
let postRoutes = new PostRoutes();
exports.default = postRoutes.router;
