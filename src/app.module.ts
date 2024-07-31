require("dotenv").config({path:"./.env"})
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthUserModule } from './module/auth_user';
import { ProfileAddressModule } from './module/profile_address';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RootQuery } from './root.query'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['dist/model/*.js'],
      synchronize: false,
    }),
    AuthUserModule,
    ProfileAddressModule,
  ],
  controllers: [AppController],
  providers: [AppService, RootQuery],
})
export class AppModule {}
