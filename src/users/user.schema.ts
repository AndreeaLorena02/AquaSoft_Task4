import { Schema, Document } from 'mongoose';

export interface User extends Document {
    // idUser: number;
    name: string;
    email: string;
    password: string;
}

export const UserSchema = new Schema({
    // idUser: {type: number, require: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
