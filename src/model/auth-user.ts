import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { ProfileAddress } from './profile-address';
import { ObjectType, Field } from '@nestjs/graphql';

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
  @Column('text', { nullable: false })
  email: string;
 
  @Field()
  @Column('varchar', { length: 15 })
  phone_number: string;

  @Field()
  @Column()
  encrypted_password: string;
 
  @Field({ nullable: true })
  @Column('text')
  address?: string ;

  @Field()
  @Column('text', { name: "role_title", nullable: false})
  role: string;

  @OneToMany(type => ProfileAddress, profile_address => profile_address.auth_user)
  @JoinColumn({name : 'auth_user_id'})
  profile_addresses: ProfileAddress[]
 
  @Field()
  @Column()
  @CreateDateColumn({type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;
 
  @Field()
  @Column()
  @UpdateDateColumn({type: 'timestamp', default: () => 'NOW()' })
  updated_at: Date;
}