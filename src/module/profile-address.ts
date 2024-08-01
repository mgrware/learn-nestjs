import { ProfileAddress } from '../model/profile-address';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { AuthUserModule } from './auth-user';
import { ProfileAddressService } from 'src/service/profile-address';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileAddress]), forwardRef(() => AuthUserModule)],
  providers: [ProfileAddressService],
  exports: [ProfileAddressService]
})
export class ProfileAddressModule {}