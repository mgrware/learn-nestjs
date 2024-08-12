import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { __Schema } from 'graphql';
import moment from 'moment';


@ObjectType()
@Entity("connect_posts")
export class ConnectPost {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Field({ nullable: true })
  @Column({ length: 500, nullable: false })
  title?: string;

  @Field({ nullable: true })
  @Column('text')
  content?: string;

  @Field()
  @Column('uuid')
  auth_user_id?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}