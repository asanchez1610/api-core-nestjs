import { Document } from 'mongoose';

export interface IUsuario extends Document {
    readonly userName: string;
    readonly password: string;
}