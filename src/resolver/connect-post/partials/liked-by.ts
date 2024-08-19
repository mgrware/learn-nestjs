import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ConnectPost } from 'src/model/connect-post';
import { ConnectLikedByService } from 'src/services/connect-liked-by';


@Resolver(of => ConnectPost)
export class LikedByPartialResolver {
  constructor(
    @Inject(ConnectLikedByService) private readonly connectLikedByService: ConnectLikedByService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @ResolveField(() => Number, {name: "totalLike"})
  async totalLike(@Parent() connectPost) {
    const { id } = connectPost;
    const totalLike = await this.connectLikedByService.countTotalLike(id);
    if (!totalLike) {
      return null
    }
    return totalLike
  }

}