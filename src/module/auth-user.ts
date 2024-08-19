import { AuthUser } from '../model/auth-user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { AuthUserService } from '../services/auth-user';
import { AuthUserResolver } from '../resolver/auth-users/auth-user';
import { ProfileAddressModule } from './profile-address';
import { PaymentSubscriptionModule } from './payment-subscription';
import { ListingModule } from './listing';
import { ProfileAddressPartialResolver } from 'src/resolver/auth-users/partials/profile-address';
import { ListingPartialResolver } from 'src/resolver/auth-users/partials/listing';


@Module({
  imports: [
    forwardRef(() => ProfileAddressModule),
    forwardRef(() => PaymentSubscriptionModule),
    forwardRef(() => ListingModule),
    TypeOrmModule.forFeature([AuthUser])],
  providers: [AuthUserService, AuthUserResolver, ProfileAddressPartialResolver, ListingPartialResolver],
  exports: [AuthUserService]
})
export class AuthUserModule {}