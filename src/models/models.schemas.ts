import * as mongoose from 'mongoose';

export const UsuarioSchema = new mongoose.Schema({
    userName: String,
    password: String
});