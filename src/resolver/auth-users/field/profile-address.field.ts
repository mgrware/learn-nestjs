import { AuthUserService } from 'src/services/auth-user';
import { ProfileAddressService } from 'src/services/profile-address';
import { AuthUser } from 'src/model/auth-user';
import { ProfileAddress } from 'src/model/profile-address';
import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';


@Resolver(of => AuthUser)
export class ProfileAddressFieldResolver {
  constructor(
    @Inject(AuthUserService) private readonly authUserService: AuthUserService,
    @Inject(ProfileAddressService) private profileAddressService: ProfileAddressService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @ResolveField(returns => [ProfileAddress])
  async profileAddress(@Parent() auth_user) {
    const { id } = auth_user;
    return this.profileAddressService.findByAuthUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @ResolveField(() => String, {name: "mainAddress"})
  async mainAddress(@Parent() auth_user) {
    const { id } = auth_user;
    const mainAddress = await this.profileAddressService.findMainAddress(id);
    if (!mainAddress) {
      return null
    }
    return mainAddress.address
  }

}