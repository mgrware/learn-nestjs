import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ListingService } from 'src/services/listing';
import { Listing } from 'src/model/listing';
import { PaginationArgs } from 'src/objects/pagination';
import { FilterInput } from 'src/objects/filter';
import { PaginatedListing } from 'src/objects/listing';

@Resolver(of => Listing)
export class ListingResolver {
  constructor(
    @Inject(ListingService) private listingService: ListingService,
  ) { }


  @UseGuards(JwtAuthGuard)
  @Query(() => PaginatedListing, { name: 'listings', nullable: true })
  async listings(
    @Args() pagination: PaginationArgs,
    @Args() filterInput: FilterInput,
    ): Promise<PaginatedListing> {
    return this.listingService.findPaginated(pagination, filterInput);
  }
  
}