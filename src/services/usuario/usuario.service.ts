import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ctts } from '../../util/constants';
import { IUsuario } from '../../models/interfaces/usuario.interface';
import { Model } from 'mongoose';
import { UsuarioDto } from '../../models/dtos/usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {

    constructor(
        @Inject(ctts.db.models.usuario.provide)
        private readonly usuarioModel: Model<IUsuario>
    ) { }

    async listarUsuarios() {
        return await this.usuarioModel.find().exec();
    }

    async crearUsuario(usuarioDto: UsuarioDto) {
        const exiteUsuario = await this.obtenerUsuarioPorUserName(usuarioDto.userName);
        if(exiteUsuario) {
            throw new HttpException(`El usuario: ${usuarioDto.userName}, ya existe.`, HttpStatus.CONFLICT);
        }
        usuarioDto.password = await bcrypt.hash(usuarioDto.password, ctts.keys.hashLevelBcrypt);
        let usuario = new this.usuarioModel(usuarioDto);
        return await usuario.save();
    }

    async obtenerUsuarioPorId(id: string) {
        return await this.usuarioModel.findOne({ _id: id });
    }

    async obtenerUsuarioPorUserName(userName: string) {
        return await this.usuarioModel.findOne({ userName: userName });
    }

    async eliminarUsuario(id: string) {
        const usuarioEliminado = await this.usuarioModel.findOneAndRemove({ _id: id });
        if(usuarioEliminado) {
            return usuarioEliminado;
        } else {
            throw new HttpException('El usuario no existe.', HttpStatus.CONFLICT);
        }
         
    }

}
