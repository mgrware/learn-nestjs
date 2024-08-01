import { AuthUser } from '../model/auth-user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { AuthUserService } from '../service/auth-user';
import { AuthUserResolver } from '../resolver/auth-user';
import { ProfileAddressModule } from './profile-address';


@Module({
  imports: [forwardRef(() => ProfileAddressModule), TypeOrmModule.forFeature([AuthUser])],
  providers: [AuthUserService, AuthUserResolver],
  exports: [AuthUserService]
})
export class AuthUserModule {}