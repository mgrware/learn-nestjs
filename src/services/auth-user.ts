import { Inject, Injectable } from '@nestjs/common';
import { AuthUser } from '../model/auth-user';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AuthUserInput, CurrentUserDTO } from '../objects/auth-user';
import { PaymentSubscriptionService } from './payment-subcription';
import { PaginationArgs } from 'src/objects/pagination';
import { paginate } from 'src/utils/pagination/paginate';
import {  FilterInput } from 'src/objects/filter';


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

      async findPaginated(
        paginationArgs: PaginationArgs,
        filterInput: FilterInput
      ) {
        const query = await this.authUserRepository
        .createQueryBuilder()
        .where(`${filterInput.fieldName} ilike :value`, { value: `%${filterInput.fieldValue}%` })
        .select();
        return paginate(query, paginationArgs);
      }


      private createWhereQuery(params: FilterInput) {
        const where: any = {};
    
        if (params.fieldName) {
          where.name = ILike(`%${params.fieldValue}%`);
        }
    
        return where;
      }
}