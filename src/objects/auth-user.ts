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
  @Field(() => String, { nullable: true, description: `User's ID` })
  id: string;
  
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

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true})
  id: string;

  @Field({ nullable: true})
  first_name: string;

  @Field({ nullable: true})
  phone_number: string;

  @Field({ nullable: true})
  email: string;
} 



@ObjectType()
export class PaginatedAuthUser extends Paginated(AuthUser) { }