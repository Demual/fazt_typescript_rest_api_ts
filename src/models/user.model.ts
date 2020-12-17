// Imports //
import { Schema, model } from 'mongoose';

// Schemas //
let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
}, { timestamps: { createdAt: true, updatedAt: true } });

export default model('user', userSchema);