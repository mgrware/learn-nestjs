import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ConnectCommentByInput {
  @Field(() => String, {nullable: true})
  auth_user_id?: string;

  @Field(() => String, {nullable: true})
  connect_post_id?: string;

  @Field(() => Text, {nullable: true})
  content?: string;

}