import { ObjectType } from "@nestjs/graphql";
import { Listing } from "src/model/listing";
import { Paginated } from "src/utils/pagination/paginated";

@ObjectType()
export class PaginatedListing extends Paginated(Listing) { }