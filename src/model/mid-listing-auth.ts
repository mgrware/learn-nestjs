import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { AuthUser } from './auth-user';

@ObjectType()
@Entity("mid_listing_auths")
export class MidListingAuth {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  // @ManyToOne(type => AuthUser, (auth_user) => auth_user.midListingAuths)
  // public auth_user: AuthUser;

}