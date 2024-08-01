import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, jwtConstants } from '../auth/guard/passport-strategy';
import { AuthUserModule } from './auth-user';
import AuthResolver from 'src/resolver/auth'
import { AuthService } from 'src/service/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from 'src/model/auth-user';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([AuthUser]),
    AuthUserModule,
  ],
  providers: [JwtStrategy, AuthResolver, AuthService],
  exports: [JwtStrategy, JwtModule, AuthService],
})
export class AuthModule {}