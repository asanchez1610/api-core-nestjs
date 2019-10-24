import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../config/database/database.module';
import { UsuarioController } from '../../controllers/usuario/usuario.controller';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { UsuarioProvider } from '../../models/providers/usuario.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [UsuarioController],
    providers: [UsuarioService, ...UsuarioProvider],
    exports: [UsuarioService]
})
export class UsuarioModule { }
