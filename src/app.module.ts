import { Module } from '@nestjs/common';
import { ConfigEnvModule } from './config/env/configenv.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './filters/http-error.filter';
import { LogModule } from './Log/log.module';

@Module({
  imports: [
    ConfigEnvModule,
    UsuarioModule,
    AuthModule,
    LogModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    }]
})
export class AppModule { }
