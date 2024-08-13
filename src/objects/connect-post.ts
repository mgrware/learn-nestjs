import { Field, InputType } from "@nestjs/graphql";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";


@InputType()
export class ConnectPostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content?: string;

  @Field(() => String, {nullable: true})
  auth_user_id?: string;

}
