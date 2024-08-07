import { Injectable } from '@nestjs/common';
import { PaymentSubscription } from '../model/payment-subscription';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentSubscriptionService {
  constructor(
      @InjectRepository(PaymentSubscription)
      private paymentSubscriptionRepository: Repository<PaymentSubscription>,
    ) {}
  
    async getIdByName(name: string): Promise<string> {
      const paymentSubscription = await this.paymentSubscriptionRepository.findOneBy({ name: name });

      return paymentSubscription ? paymentSubscription.id : undefined;
    }
}