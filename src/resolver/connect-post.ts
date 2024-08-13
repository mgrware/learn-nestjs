import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { JwtAuthGuard } from "src/auth/auth.guard";
import CurrentUser from "src/auth/current-user";
import { ConnectPost } from "src/model/connect-post";
import { CurrentUserDTO } from "src/objects/auth-user";
import { ConnectPostInput } from "src/objects/connect-post";
import { ConnectPostService } from "src/services/connect-post";

const pubSub = new PubSub();

@Resolver((of) => ConnectPost)
export class ConnectPostResolver {

  constructor(
    @Inject(ConnectPostService) private readonly connectPostService: ConnectPostService,
  ) { }
  @Subscription((returns) => ConnectPost)
  postAdded() {
    return pubSub.asyncIterator('postAdded');
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => ConnectPost)
  async addPost(
    @Args('ConnectPostInput') connectPostInput: ConnectPostInput,
    @CurrentUser() currentUser: CurrentUserDTO,
  ){
    connectPostInput['auth_user_id'] = currentUser.id
    const newPost = this.connectPostService.create(connectPostInput)
    pubSub.publish('postAdded', { postAdded: newPost });
    return newPost
  }
}