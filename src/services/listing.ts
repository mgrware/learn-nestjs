import { AuthUserService } from './auth-user';
import { Listing } from 'src/model/listing';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationArgs } from 'src/objects/pagination';
import { FilterInput } from 'src/objects/filter';
import { paginate } from 'src/utils/pagination/paginate';

@Injectable()
export class ListingService {

  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
    private authUserService: AuthUserService
  ) { }

  findAll(): Promise<Listing[]> {
    return this.listingRepository.find();
  }

  findByAuthUser(id: string): Promise<Listing[]>{
    return this.listingRepository.createQueryBuilder("listing")
    .leftJoinAndSelect("listing.auth_users", "auth_user")
    .where("listing_auth_user.auth_user_id = :id", { id })
    .getMany();
  }

  findOne(id: string): Promise<Listing> {
    return this.listingRepository.findOneBy({id: id});
  }

  async findPaginated(
    paginationArgs: PaginationArgs,
    filterInput: FilterInput
  ) {
    const query = this.listingRepository
    .createQueryBuilder()
    .where({ status: "published" })
    .select();

    if (filterInput.fieldName && filterInput.fieldValue) {
      query.where(`${filterInput.fieldName} ilike :value`, { value: `%${filterInput.fieldValue}%` })
    }

    return paginate(query, paginationArgs);
  }
}