import { PaymentSubscription } from '../model/payment-subscription';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { AuthUserModule } from './auth-user';
import { PaymentSubscriptionService } from 'src/service/payment-subcription';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentSubscription]), forwardRef(() => AuthUserModule)],
  providers: [PaymentSubscriptionService],
  exports: [PaymentSubscriptionService]
})
export class PaymentSubscriptionModule {}