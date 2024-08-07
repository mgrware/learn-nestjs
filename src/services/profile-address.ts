import { AuthUserService } from './auth-user';
import { ProfileAddress } from 'src/model/profile-address';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileAddressService {

  constructor(
    @InjectRepository(ProfileAddress)
    private profileAddressRepository: Repository<ProfileAddress>,
    private authUserService: AuthUserService
  ) { }

  findAll(): Promise<ProfileAddress[]> {
    return this.profileAddressRepository.find();
  }

  findByAuthUser(id: string): Promise<ProfileAddress[]>{
    return this.profileAddressRepository.createQueryBuilder("profile_addresses")
    .where("profile_addresses.auth_user_id = :id", { id })
    .getMany();
  }

  findOne(id: string): Promise<ProfileAddress> {
    return this.profileAddressRepository.findOneBy({id: id});
  }

  async findMainAddress(id: string): Promise<ProfileAddress> {
    const result = await this.profileAddressRepository.createQueryBuilder("profile_addresses")
    .where("profile_addresses.auth_user_id = :id and profile_addresses.is_public = :is_public", { id: id, is_public: true })
    .getOne();
    return result || null;
  }
}