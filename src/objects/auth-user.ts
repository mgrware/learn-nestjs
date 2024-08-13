import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { AuthUser } from "src/model/auth-user";
import { Paginated } from "src/utils/pagination/paginated";

export class AuthUserDTO {
  first_name: string;
  email: string;
  phone_number: string;
  role?: string;
  address?: string;
}

export class CurrentUserDTO {
  id: string;
  first_name: string;
  email: string;
  phone_number: string;
  role?: string;
  address?: string;
}

@InputType()
export class AuthUserInput {
  @Field(() => String, { description: `User's First name` })
  first_name: string;

  @Field(() => String, { description: `User's phone number` })
  phone_number: string;

  @Field(() => String, { description: `User's email address` })
  email: string;

  @Field(() => String, { description: `User's subscription`, nullable: true })
  @IsOptional()
  payment_subscription_id?: string;

}

@ObjectType()
export class PaginatedAuthUser extends Paginated(AuthUser) { }