import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity("connect_liked_bies")
export class ConnectLikedBy {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('uuid')
  auth_user_id?: string;

  @Field()
  @Column('uuid')
  connect_post_id?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()", onUpdate: "NOW()" })
  public updated_at: Date;
}