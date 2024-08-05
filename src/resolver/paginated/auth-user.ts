import { AuthUser } from "src/model/auth-user";
import { ObjectType } from '@nestjs/graphql';
import { Paginated } from "src/utils/pagination/paginated";

@ObjectType()
export class PaginatedAuthUser extends Paginated(AuthUser) { }