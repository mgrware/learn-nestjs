import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
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

  @Field()
  totalLike?: Number;

  @CreateDateColumn({ type: "timestamp", default: () => "NOW()" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "NOW()", onUpdate: "NOW()" })
  public updated_at: Date;

  // @BeforeInsert()
  // insertCreated() {
  //   console.log(moment().format("YYYY-MM-DD HH:mm:ss"))
  //     this.created_at = new Date(
  //       moment().format("YYYY-MM-DD HH:mm:ss")
  //     );
  //     this.updated_at = new Date(
  //       moment().format("YYYY-MM-DD HH:mm:ss")
  //     );
  //   }

  // @BeforeUpdate()
  // insertUpdated() {
  //     this.updated_at = new Date(
  //       moment().format("YYYY-MM-DD HH:mm:ss")
  //     );
  //   }
}