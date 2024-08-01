import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUserService } from 'src/service/auth-user';
import { IJwtPayload } from 'src/object/jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtStrategy') {
  constructor(private readonly authUserService: AuthUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.authUserService.findOne(payload.auth_user_id);

    if (!user || !payload) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

// guards/constants.ts

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};