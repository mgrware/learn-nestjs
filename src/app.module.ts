require("dotenv").config({path:"./.env"})
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthUserModule } from './module/auth-user';
import { ProfileAddressModule } from './module/profile-address';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth';
import { PaymentSubscriptionModule } from './module/payment-subscription';
import { ListingModule } from './module/listing';
import { ConnectPostModule } from './module/connect-post';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql'
        },
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      }
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
      logging: ["query", "error"],
    }),
    AuthModule,
    AuthUserModule,
    ProfileAddressModule,
    PaymentSubscriptionModule,
    ListingModule,
    ConnectPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
