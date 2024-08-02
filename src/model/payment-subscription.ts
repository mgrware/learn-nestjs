import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity("payment_subscriptions")
export class PaymentSubscription {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

}