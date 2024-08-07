import { AuthUserService } from '../services/auth-user';
import { ProfileAddressService } from 'src/services/profile-address';
import { AuthUser } from '../model/auth-user';
import { ProfileAddress } from 'src/model/profile-address';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import CurrentUser from 'src/auth/current-user';
import { CurrentUserDTO, AuthUserInput } from 'src/objects/auth-user';
import { PaginatedAuthUser } from '../objects/paginated';
import { PaginationArgs } from 'src/objects/pagination';
import { FilterInput } from 'src/objects/filter';
import { ListingService } from 'src/services/listing';
import { Listing } from 'src/model/listing';

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
  @ResolveField(returns => [ProfileAddress])
  async profileAddress(@Parent() auth_user) {
    const { id } = auth_user;
    return this.profileAddressService.findByAuthUser(id);
  }

  @ResolveField(returns => [Listing])
  async listing(@Parent() auth_user) {
    const { id } = auth_user;
    return this.listingService.findByAuthUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => PaginatedAuthUser)
  async authUsers(
    @Args() pagination: PaginationArgs,
    @Args() filterInput: FilterInput,
    ): Promise<PaginatedAuthUser> {
    return this.authUserService.findPaginated(pagination, filterInput);
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

}