import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { JwtAuthGuard } from "src/auth/auth.guard";
import CurrentUser from "src/auth/current-user";
import { ConnectPost } from "src/model/connect-post";
import { CurrentUserDTO } from "src/objects/auth-user";
import { ConnectLikedByInput } from "src/objects/connect-liked-by";
import { ConnectPostInput } from "src/objects/connect-post";
import { ConnectLikedByService } from "src/services/connect-liked-by";
import { ConnectPostService } from "src/services/connect-post";

const pubSub = new PubSub();

@Resolver((of) => ConnectPost)
export class ConnectPostPubSubResolver {
  constructor(
    @Inject(ConnectPostService) private readonly connectPostService: ConnectPostService,
    @Inject(ConnectLikedByService) private readonly connectLikedByService: ConnectLikedByService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Subscription((returns) => ConnectPost)
  postAdded() {
    return pubSub.asyncIterator('postAdded');
  }

  @Subscription((returns) => ConnectPost)
  likeAdded() {
    return pubSub.asyncIterator('likeAdded');
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

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => ConnectPost)
  async addLike(
    @Args('ConnectLikedByInput') connectLikedByInput: ConnectLikedByInput,
    @CurrentUser() currentUser: CurrentUserDTO,
  ){
    connectLikedByInput['auth_user_id'] = currentUser.id
    this.connectLikedByService.create(connectLikedByInput)
    const post = this.connectPostService.findOne(connectLikedByInput['connect_post_id'])
    console.log(post)
    pubSub.publish('likeAdded', { likeAdded: post });
    return post
  }
}