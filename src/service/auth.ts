import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from 'src/model/auth-user';
import { AuthInput } from 'src/object/auth';
import { IJwtPayload } from 'src/object/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUserRepository: Repository<AuthUser>,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}
  async execute(authInput: AuthInput) {
    const user = await this.authUserRepository.findOneBy({email: authInput.email});
    console.log(authInput.email)
    if (!user) {
      throw new UnauthorizedException('User email or password incorrect');
    }
    const passwordHasMatch = await compare(authInput.password, user.encrypted_password);
    if (!passwordHasMatch) {
      throw new UnauthorizedException('User email or password incorrect');
    }

    const payload: IJwtPayload = {
      auth_user_id: user.id,
      iat: 123456,
    };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}