import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { LogService } from './log/log.service';

function applySecurity(app) {
  app.use(helmet());
  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });
}

function applyOpenApi(app) {
  const hostOpenAPi = 'open-api';
  
  const optionsUsuario = new DocumentBuilder()
    .setTitle('Usuarios')
    .setDescription('API de servicios de usuarios')
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .build();

  const usuarioDocument = SwaggerModule.createDocument(app, optionsUsuario, {
    include: [UsuarioModule],
  });
  SwaggerModule.setup(`${hostOpenAPi}/usuarios`, app, usuarioDocument);

}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LogService(),
  });

  applySecurity(app);

  applyOpenApi(app);

  await app.listen(3001);
}
bootstrap();
