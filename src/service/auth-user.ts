import { Inject, Injectable } from '@nestjs/common';
import { AuthUser } from '../model/auth-user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserInput, CurrentUserDTO } from '../object/auth-user';
import { PaymentSubscriptionService } from './payment-subcription';


@Injectable()
export class AuthUserService {
    constructor(
        @InjectRepository(AuthUser)
        private authUserRepository: Repository<AuthUser>,
        @Inject(PaymentSubscriptionService)
        private paymentSubscriptionService: PaymentSubscriptionService,
      ) {}

      async create(details: AuthUserInput): Promise<AuthUser>{
        const paymentSubscriptionId = await this.paymentSubscriptionService.getIdByName("free")
        
        details['payment_subscription_id'] = paymentSubscriptionId
        console.log("TESt", details)
        return this.authUserRepository.save(details);
      }
    
      findAll(): Promise<AuthUser[]> {
        return this.authUserRepository.find();
      }
    
      findOne(id: string): Promise<AuthUser> {
        return this.authUserRepository.findOneBy({id: id});
      }

      async findUserFromContext(currentUser: CurrentUserDTO) {
        return this.authUserRepository.findOneBy({id: currentUser.id});
      }
}