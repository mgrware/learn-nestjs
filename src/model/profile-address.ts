import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { AuthUser } from './auth-user';

@ObjectType()
@Entity("profile_addresses")
export class ProfileAddress {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Field()
  @Column({ length: 500, nullable: false })
  title: string;
 
  @Field()
  @Column('varchar')
  receiver_name?: string;
  
  @Field()
  @Column()
  latitude: string;

  @Field()
  @Column()
  longitude: string;

  @Field()
  @Column('varchar')
  country: string;
  
  @Field()
  @Column('varchar')
  city: string;

  @Field()
  @Column('varchar')
  zip_code: string;

  @Field()
  @Column('varchar', { length: 15 })
  phone_number: string;

  @Field()
  @Column('text')
  location: string ;
 
  @Field()
  @Column('text')
  address: string ;
  
  @Field(type => AuthUser)
  @ManyToOne(type => AuthUser, auth_user => auth_user.profile_addresses)
  @JoinColumn({name : 'auth_user_id'})
  auth_user: AuthUser;
 
  @Field()
  @Column()
  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;
 
  @Field()
  @Column()
  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()' })
  updated_at: Date;
}