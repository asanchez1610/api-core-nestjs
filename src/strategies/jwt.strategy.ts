import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ctts } from '../util/constants';
import { LogService } from '../log/log.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly logger: LogService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ctts.jwt.secret,
    });
  }

  async validate(payload: any) {
    this.logger.log(`Validate payload: ${JSON.stringify(payload)}`);
    return { userId: payload.sub, username: payload.username };
  }
}