import { Inject, Injectable } from '@nestjs/common';
import { AuthUser } from '../model/auth-user';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AuthUserInput, CurrentUserDTO } from '../objects/auth-user';
import { PaymentSubscriptionService } from './payment-subcription';
import { PaginationArgs } from 'src/objects/pagination';
import { paginate } from 'src/utils/pagination/paginate';
import {  FilterInput } from 'src/objects/filter';
import { ConnectPost } from 'src/model/connect-post';
import { ConnectPostInput } from 'src/objects/connect-post';


@Injectable()
export class ConnectPostService {
    constructor(
        @InjectRepository(ConnectPost)
        private connectPostRepository: Repository<ConnectPost>,
      ) {}

      async create(details: ConnectPostInput): Promise<ConnectPost>{
        console.log(details)
        return this.connectPostRepository.save(details);
      }
}