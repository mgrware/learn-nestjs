import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationArgs } from 'src/objects/pagination';
import { paginate } from 'src/utils/pagination/paginate';
import {  FilterInput } from 'src/objects/filter';
import { ConnectPost } from 'src/model/connect-post';
import { ConnectPostInput } from 'src/objects/connect-post';
import * as moment from "moment";


@Injectable()
export class ConnectPostService {
    constructor(
        @InjectRepository(ConnectPost)
        private connectPostRepository: Repository<ConnectPost>,
      ) {}

      async create(details: ConnectPostInput): Promise<ConnectPost>{
        details['created_at'] = new Date(moment().format("YYYY-MM-DD HH:mm:ss"))
        details['updated_at'] = new Date(moment().format("YYYY-MM-DD HH:mm:ss"))
        console.log(details)
        return this.connectPostRepository.save(details);
      }

      async findPaginated(
        paginationArgs: PaginationArgs,
        filterInput: FilterInput
      ) {
        const query = this.connectPostRepository
        .createQueryBuilder()
        .select();

        if (filterInput.fieldName && filterInput.fieldValue) {
          query.where(`${filterInput.fieldName} ilike :value`, { value: `%${filterInput.fieldValue}%` })
        }

        return paginate(query, paginationArgs);
      }

      findAll(): Promise<ConnectPost[]> {
        return this.connectPostRepository.find();
      }

      findOne(id: string): Promise<ConnectPost> {
        return this.connectPostRepository.findOneBy({id: id});
      }
    
}