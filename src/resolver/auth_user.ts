import { AuthUserService } from './../service/auth_user';
import { ProfileAddressService } from 'src/service/profile_address';
import { AuthUser } from './../model/auth_user';
import { ProfileAddress } from 'src/model/profile_address';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

@Resolver(of => AuthUser)
export class AuthUserrResolver {
  constructor(
    @Inject(AuthUserService) private authUserService: AuthUserService,
    @Inject(ProfileAddressService) private profileAddressService: ProfileAddressService
  ) { }
  @Query(returns => AuthUser)
  async authUser(@Args('id') id: string): Promise<AuthUser> {
    return await this.authUserService.findOne(id);
  }

  @ResolveField(returns => [ProfileAddress])
  async profile_address(@Parent() auth_user) {
    const { id } = auth_user;
    console.log(auth_user);
    return this.profileAddressService.findByAuthUser(id);
  }

  @Query(returns => [AuthUser])
  async authUsers(): Promise<AuthUser[]> {
    return await this.authUserService.findAll();
  }
  
  @Mutation(returns => AuthUser)
  async createAuthUser(
    @Args('first_name') first_name: string,
    @Args('email') email: string,
    @Args('phone_number', { nullable: true }) phone_number: string,
  ): Promise<AuthUser> {
    return await this.authUserService.create({ first_name, email, phone_number })
  }
}