import { AuthUserService } from 'src/services/auth-user';
import { ProfileAddressService } from 'src/services/profile-address';
import { AuthUser } from 'src/model/auth-user';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import CurrentUser from 'src/auth/current-user';
import { CurrentUserDTO, AuthUserInput, PaginatedAuthUser } from 'src/objects/auth-user';
import { PaginationArgs } from 'src/objects/pagination';
import { FilterInput } from 'src/objects/filter';
import { ListingService } from 'src/services/listing';
import { ConnectPost } from 'src/model/connect-post';
import { ConnectPostService } from 'src/services/connect-post';
import { PaginatedConnectPost } from 'src/objects/connect-post';

@Resolver(of => ConnectPost)
export class ConnectPostResolver {
  constructor(
    @Inject(ConnectPostService) private readonly connectPostService: ConnectPostService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Query(() => [ConnectPost])
  async connectPosts(
    ): Promise<ConnectPost[]> {
    return this.connectPostService.findAll();
  }

}