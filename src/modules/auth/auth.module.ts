import { Module } from '@nestjs/common';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from '../../services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../strategies/local.strategy';
import { AuthController } from '../../controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ctts } from '../../util/constants';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { LogModule } from '../../Log/log.module';
import { LogService } from '../../log/log.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: ctts.keys.strategyJwtName }),
        UsuarioModule,
        JwtModule.register({
            secret: ctts.jwt.secret,
            signOptions: { expiresIn: ctts.keys.expiresIn },
        })
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
