import { AuthUserService } from '../service/auth-user';
import { ProfileAddressService } from 'src/service/profile-address';
import { AuthUser } from '../model/auth-user';
import { ProfileAddress } from 'src/model/profile-address';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import CurrentUser from 'src/auth/current-user';
import { CurrentUserDTO, AuthUserInput } from 'src/object/auth-user';

@Resolver(of => AuthUser)
export class AuthUserResolver {
  constructor(
    @Inject(AuthUserService) private readonly authUserService: AuthUserService,
    @Inject(ProfileAddressService) private profileAddressService: ProfileAddressService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Query(returns => AuthUser)
  async authUser(@Args('id') id: string, @CurrentUser() currentUser: CurrentUserDTO,): Promise<AuthUser> {
    return await this.authUserService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ResolveField(returns => [ProfileAddress])
  async profile_address(@Parent() auth_user) {
    const { id } = auth_user;
    return this.profileAddressService.findByAuthUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(returns => [AuthUser])
  async authUsers(): Promise<AuthUser[]> {
    return await this.authUserService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Query(() => AuthUser, { name: 'currentUser', nullable: true })
  async getCurrentUser(@CurrentUser() currentUser: CurrentUserDTO): Promise<AuthUser> {
    return this.authUserService.findUserFromContext(currentUser);
  }

  @Mutation(returns => AuthUser)
  async createAuthUser(
    @Args('AuthUserInput') authUserInput: AuthUserInput,
  ): Promise<AuthUser> {
    // authUserInput['payment_subcription_id'] = ""
    // console.log(authUserInput)
    return await this.authUserService.create(authUserInput)
  }

}