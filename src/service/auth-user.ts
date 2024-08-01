import { Injectable } from '@nestjs/common';
import { AuthUser } from '../model/auth-user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserDTO, CurrentUserDTO } from '../object/auth-user';

@Injectable()
export class AuthUserService {
    constructor(
        @InjectRepository(AuthUser)
        private authUserRepository: Repository<AuthUser>,
      ) {}

      create(details: AuthUserDTO): Promise<AuthUser>{
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