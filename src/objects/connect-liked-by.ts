import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ConnectLikedByInput {
  @Field(() => String, {nullable: true})
  auth_user_id?: string;

  @Field(() => String, {nullable: true})
  connect_post_id?: string;

}