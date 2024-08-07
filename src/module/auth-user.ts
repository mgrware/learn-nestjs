import { AuthUser } from '../model/auth-user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { AuthUserService } from '../services/auth-user';
import { AuthUserResolver } from '../resolver/auth-users/auth-user';
import { ProfileAddressModule } from './profile-address';
import { PaymentSubscriptionModule } from './payment-subscription';
import { ListingModule } from './listing';
import { ProfileAddressFieldResolver } from 'src/resolver/auth-users/field/profile-address.field';
import { ListingFieldResolver } from 'src/resolver/auth-users/field/listing.field';


@Module({
  imports: [
    forwardRef(() => ProfileAddressModule),
    forwardRef(() => PaymentSubscriptionModule),
    forwardRef(() => ListingModule),
    TypeOrmModule.forFeature([AuthUser])],
  providers: [AuthUserService, AuthUserResolver, ProfileAddressFieldResolver, ListingFieldResolver],
  exports: [AuthUserService]
})
export class AuthUserModule {}