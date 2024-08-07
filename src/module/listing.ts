import { Listing } from '../model/listing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { AuthUserModule } from './auth-user';
import { ListingService } from 'src/services/listing';
import { ListingResolver } from 'src/resolver/listing';

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), forwardRef(() => AuthUserModule)],
  providers: [ListingService, ListingResolver],
  exports: [ListingService]
})
export class ListingModule {}