import { AuthUser } from "src/model/auth-user";
import { ObjectType } from '@nestjs/graphql';
import { Paginated } from "src/utils/pagination/paginated";
import { Listing } from "src/model/listing";

@ObjectType()
export class PaginatedAuthUser extends Paginated(AuthUser) { }

@ObjectType()
export class PaginatedListing extends Paginated(Listing) { }