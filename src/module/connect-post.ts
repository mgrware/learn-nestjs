import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ConnectPost } from 'src/model/connect-post';
import { ConnectPostResolver } from 'src/resolver/connect-post';
import { ConnectPostService } from 'src/services/connect-post';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectPost])],
  providers: [ConnectPostResolver, ConnectPostService],
  exports: []
})
export class ConnectPostModule {}