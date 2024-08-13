import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ConnectPost } from 'src/model/connect-post';
import { ConnectPostResolver } from 'src/resolver/connect-post/connect-post';
import { ConnectPostService } from 'src/services/connect-post';
import { ConnectPostPubSubResolver } from 'src/resolver/pubsub/connect-post';
import { ConnectLikedByService } from 'src/services/connect-liked-by';
import { ConnectLikedBy } from 'src/model/connect-liked-by';
import { LikedByPartialResolver } from 'src/resolver/connect-post/partials/liked-by';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConnectPost]),
    TypeOrmModule.forFeature([ConnectLikedBy])],
  providers: [ConnectPostResolver, ConnectPostPubSubResolver, ConnectPostService, ConnectLikedByService, LikedByPartialResolver],
  exports: []
})
export class ConnectPostModule {}