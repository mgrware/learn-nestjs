import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ProfileAddress } from './profile-address';
import { ObjectType, Field } from '@nestjs/graphql';
import { Listing } from './listing';

@ObjectType()
@Entity("auth_users")
export class AuthUser {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Field()
  @Column({ length: 500, nullable: false })
  first_name: string;
 
  @Field()
  @Column('text', { nullable: false, unique: true })
  email: string;
 
  @Field()
  @Column('varchar', { length: 15, unique: true })
  phone_number: string;

  @Field()
  @Column()
  encrypted_password: string;
 
  @Field({ nullable: true })
  @Column('text')
  address?: string;

  @Field()
  @Column('text', { name: "role_title", nullable: false})
  role: string;  

  @Field()
  @Column('uuid')
  payment_subscription_id: string;

  @OneToMany(type => ProfileAddress, profile_address => profile_address.auth_user)
  @JoinColumn({name : 'auth_user_id'})
  profile_addresses: ProfileAddress[]



  @ManyToMany(() => Listing, (listing) => listing.auth_users)
  @JoinTable({
    name: "mid_listing_auths", // table name for the junction table of this relation
    joinColumn: {
        name: "leaseable_id",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "auth_user_d",
        referencedColumnName: "id"
    }
})
  listings: Listing[]

  @Field()
  @Column()
  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;
 
  @Field()
  @Column()
  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()' })
  updated_at: Date;

  @Field(() => String, { name: 'mainAddress', nullable: true }) // Custom field name
  mainAddress?: string;
}