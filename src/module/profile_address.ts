import { ProfileAddress } from '../model/profile_address';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { AuthUserModule } from './auth_user';
import { ProfileAddressService } from 'src/service/profile_address';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileAddress]), forwardRef(() => AuthUserModule)],
  providers: [ProfileAddressService],
  exports: [ProfileAddressService]
})
export class ProfileAddressModule {}