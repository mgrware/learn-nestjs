import { AuthUserService } from 'src/services/auth-user';
import { AuthUser } from 'src/model/auth-user';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ListingService } from 'src/services/listing';
import { Listing } from 'src/model/listing';

@Resolver(of => AuthUser)
export class ListingPartialResolver {
  constructor(
    @Inject(AuthUserService) private readonly authUserService: AuthUserService,
    @Inject(ListingService) private listingService: ListingService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @ResolveField(returns => [Listing])
  async listing(@Parent() authUser) {
    const { id } = authUser;
    return this.listingService.findByAuthUser(id);
  }
}