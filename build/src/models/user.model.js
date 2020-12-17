"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    post: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'post'
        }]
}, { timestamps: { createdAt: true, updatedAt: true } });
exports.default = mongoose_1.model('user', userSchema);
