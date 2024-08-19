import { Inject, Injectable } from '@nestjs/common';
import { AuthUser } from '../model/auth-user';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AuthUserInput, CurrentUserDTO, UpdateUserInput } from '../objects/auth-user';
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

      async create(input: AuthUserInput): Promise<AuthUser>{
        const paymentSubscriptionId = await this.paymentSubscriptionService.getIdByName("free")
        
        input['payment_subscription_id'] = paymentSubscriptionId
        return this.authUserRepository.save(input);
      }
    
      findAll(): Promise<AuthUser[]> {
        return this.authUserRepository.createQueryBuilder().getMany();
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
        const query = this.authUserRepository
        .createQueryBuilder()
        .select();

        if (filterInput.fieldName && filterInput.fieldValue) {
          query.where(`${filterInput.fieldName} ilike :value`, { value: `%${filterInput.fieldValue}%` })
        }

        return paginate(query, paginationArgs);
      }

      async update(updateUserInput: UpdateUserInput) {
        const user = await this.authUserRepository.findOneBy({id: updateUserInput.id});
        this.authUserRepository.merge(user, updateUserInput);
        return this.authUserRepository.save(user);
      }

      async remove(id: string): Promise<AuthUser> {
        const user = await this.authUserRepository.findOneBy({id: id});
        if (!user) {
          throw new Error('User not found');
        }
        await this.authUserRepository.delete(id);
        return user;
      }
}