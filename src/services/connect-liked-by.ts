import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from "moment";
import { ConnectLikedBy } from 'src/model/connect-liked-by';
import { ConnectLikedByInput } from 'src/objects/connect-liked-by';


@Injectable()
export class ConnectLikedByService {
    constructor(
        @InjectRepository(ConnectLikedBy)
        private connectLikedByRepository: Repository<ConnectLikedBy>,
      ) {}

      async create(input: ConnectLikedByInput): Promise<ConnectLikedBy>{
        input['created_at'] = new Date(moment().format("YYYY-MM-DD HH:mm:ss"))
        input['updated_at'] = new Date(moment().format("YYYY-MM-DD HH:mm:ss"))
        return this.connectLikedByRepository.save(input);
      }


      async countTotalLike(id: string): Promise<Number> {
        const [products, count] = await this.connectLikedByRepository.findAndCount({
          where: { connect_post_id: id },
        });

        return count
      }
    
}