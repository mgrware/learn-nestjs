import { AuthUser } from '../model/auth-user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { AuthUserService } from '../services/auth-user';
import { AuthUserResolver } from '../resolver/auth-user';
import { ProfileAddressModule } from './profile-address';
import { PaymentSubscriptionModule } from './payment-subscription';


@Module({
  imports: [
    forwardRef(() => ProfileAddressModule),
    forwardRef(() => PaymentSubscriptionModule),
    TypeOrmModule.forFeature([AuthUser])],
  providers: [AuthUserService, AuthUserResolver],
  exports: [AuthUserService]
})
export class AuthUserModule {}