import { AuthUser } from '../model/auth_user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { AuthUserService } from '../service/auth_user';
import { AuthUserrResolver } from '../resolver/auth_user';
import { ProfileAddressModule } from './profile_address';


@Module({
  imports: [forwardRef(() => ProfileAddressModule), TypeOrmModule.forFeature([AuthUser])],
  providers: [AuthUserService, AuthUserrResolver],
  exports: [AuthUserService]
})
export class AuthUserModule {}