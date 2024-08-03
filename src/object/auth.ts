import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

@InputType()
export class AuthInput {
  @Field(() => String, { description: `User's email address` })
  @IsEmail()
  email: string;

  @Field(() => String, { description: `User's plain-text password` })
  @IsString()
  @MinLength(8)
  @MaxLength(256)
  password: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => String, { description: `JWT access token` })
  accessToken: string;
}