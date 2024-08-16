import { AuthUserService } from 'src/services/auth-user';
import { ProfileAddressService } from 'src/services/profile-address';
import { AuthUser } from 'src/model/auth-user';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import CurrentUser from 'src/auth/current-user';
import { CurrentUserDTO, AuthUserInput, PaginatedAuthUser, UpdateUserInput } from 'src/objects/auth-user';
import { PaginationArgs } from 'src/objects/pagination';
import { FilterInput } from 'src/objects/filter';
import { ListingService } from 'src/services/listing';

@Resolver(of => AuthUser)
export class AuthUserResolver {
  constructor(
    @Inject(AuthUserService) private readonly authUserService: AuthUserService,
    @Inject(ProfileAddressService) private profileAddressService: ProfileAddressService,
    @Inject(ListingService) private listingService: ListingService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Query(returns => AuthUser)
  async authUser(@Args('id') id: string, @CurrentUser() currentUser: CurrentUserDTO,): Promise<AuthUser> {
    return await this.authUserService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuthUser])
  async authUsers(
    ): Promise<AuthUser[]> {
    return this.authUserService.findAll();
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
    return await this.authUserService.create(authUserInput)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => AuthUser)
  async updateAuthUser(
    @Args('UpdateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: CurrentUserDTO,
  ): Promise<AuthUser> {
    
    updateUserInput['id'] = currentUser.id
    return await this.authUserService.update(updateUserInput)
  }

  @Mutation(() => AuthUser)
  async removeUser(@Args('id') id: string): Promise<AuthUser> {
    return await this.authUserService.remove(id);
  }

}