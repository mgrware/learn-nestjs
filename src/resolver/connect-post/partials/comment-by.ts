import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ConnectPost } from 'src/model/connect-post';
import { ConnectCommentByService } from 'src/services/connect-comment-by';


@Resolver(of => ConnectPost)
export class CommentByPartialResolver {
  constructor(
    @Inject(ConnectCommentByService) private readonly connectCommentByService: ConnectCommentByService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @ResolveField(() => Number, {name: "totalComment"})
  async totalComments(@Parent() connectPost) {
    const { id } = connectPost;
    const totalLike = await this.connectCommentByService.countTotalComment(id);
    if (!totalLike) {
      return null
    }
    return totalLike
  }

}