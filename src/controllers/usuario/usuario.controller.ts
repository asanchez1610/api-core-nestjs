import { Controller, Post, Body, Get, UseGuards, Delete, Param } from '@nestjs/common';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { AuthGuard } from '@nestjs/passport';
import { ctts } from '../../util/constants';
import { ApiBearerAuth, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { UsuarioDto } from '../../models/dtos/usuario.dto';

@Controller('usuarios')
@UseGuards(AuthGuard(ctts.keys.strategyJwtName))
@ApiBearerAuth()
export class UsuarioController {

    constructor(
        private readonly usuarioService: UsuarioService
    ) { }

    @Post()
    @ApiOperation({ title: 'Metodo de creacion de usuario' })
    async crearUsuario(@Body() usuario: UsuarioDto) {
        return await this.usuarioService.crearUsuario(usuario);
    }

    @Get()
    @ApiOperation({ title: 'Metodo listado de usuarios' })
    async listarUsuario() {
        let usuarios = await this.usuarioService.listarUsuarios();
        return { data: usuarios };
    }

    @Delete(':id')
    @ApiOperation({ title: 'Metodo de eliminacion de usuario por id' })
    @ApiImplicitParam({ name: 'id', required: true, type: 'string' })
    async eliminarUsuario(@Param() params) {
        const usuarioEliminado = await this.usuarioService.eliminarUsuario(params.id);
        return { data: usuarioEliminado }
    }

}
