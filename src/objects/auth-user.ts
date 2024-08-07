import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

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
  @IsEmail()
  email: string;

  @Field(() => String, { description: `User's subscription`, nullable: true })
  @IsEmail()
  @IsOptional()
  payment_subscription_id?: string;

}
