import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class FilterInput {
  @Field(() => String, { nullable: true })
  fieldName?: string;

  @Field(() => String, { nullable: true })
  fieldValue?: string;
}