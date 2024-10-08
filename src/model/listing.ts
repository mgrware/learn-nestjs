import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { AuthUser } from './auth-user';

@ObjectType()
@Entity("listing_listings")
export class Listing {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Field({ nullable: true })
  @Column({ length: 500, nullable: false })
  name?: string;

  @ManyToMany(() => AuthUser, (auth_user) => auth_user.listings)
  @JoinTable({
    name: "mid_listing_auths", // table name for the junction table of this relation
    joinColumn: {
        name: "leaseable_id",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "auth_user_id",
        referencedColumnName: "id"
    }
  })
  auth_users: AuthUser[]

  @Field({ nullable: true })
  @Column({ nullable: false })
  status?: string;

}