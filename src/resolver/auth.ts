import { AuthService } from "src/service/auth";
import { AuthResponse, AuthInput } from "src/object/auth";
import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";

@Resolver()
export default class AuthResolver {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signIn' })
  async signIn(
    @Args('SignInput') authInput: AuthInput
) {
    return this.authService.execute(authInput);
  }
}