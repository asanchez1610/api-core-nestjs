import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../services/auth/auth.service';
import { ctts } from '../../util/constants';
import { LogService } from '../../log/log.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly logger: LogService
  ) { }

  @UseGuards(AuthGuard(ctts.keys.strategyLocalName))
  @Post('login')
  async login(@Request() req) {
    this.logger.log(`Autenticacion exitosa para el usuario: ${req.user.userName}`);
    return this.authService.login(req.user);
  }

}
