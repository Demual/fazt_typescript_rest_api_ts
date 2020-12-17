// Imports //
import { Schema, model } from 'mongoose';

// Schemas //
let postSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    image: { type: String },
}, { timestamps: { createdAt: true, updatedAt: true } });

export default model('post', postSchema);