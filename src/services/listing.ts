import { AuthUserService } from './auth-user';
import { Listing } from 'src/model/listing';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    .where("mid_listing_auths.auth_user_id = :id", { id })
    .getMany();
  }

  findOne(id: string): Promise<Listing> {
    return this.listingRepository.findOneBy({id: id});
  }
}