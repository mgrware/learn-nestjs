import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ConnectPost } from "src/model/connect-post";
import { Paginated } from "src/utils/pagination/paginated";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";


@InputType()
export class ConnectPostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content?: string;

  @Field(() => String, {nullable: true})
  auth_user_id?: string;

  @Field(() => String, {nullable: true})
  created_at?: Date;

  @Field(() => String, {nullable: true})
  updated_at?: Date;

}

@ObjectType()
export class PaginatedConnectPost extends Paginated(ConnectPost) { }