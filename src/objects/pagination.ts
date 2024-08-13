import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';


@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field(() => String, { nullable: true })
  before?: string;
}

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  startCursor: string;

  @Field({ nullable: true })
  endCursor: string;

  @Field()
  hasPreviousPage: boolean;

  @Field()
  hasNextPage: boolean;

  @Field()
  countBefore: number;

  @Field()
  countNext: number;

  @Field()
  countCurrent: number;

  @Field()
  countTotal: number;
}
