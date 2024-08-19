import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from "moment";
import { ConnectCommentBy } from 'src/model/connect-comment-by';
import { ConnectCommentByInput } from 'src/objects/connect-comment-by';


@Injectable()
export class ConnectCommentByService {
    constructor(
        @InjectRepository(ConnectCommentBy)
        private connectCommentByRepository: Repository<ConnectCommentBy>,
      ) {}

      async create(input: ConnectCommentByInput): Promise<ConnectCommentBy>{
        input['created_at'] = new Date(moment().format("YYYY-MM-DD HH:mm:ss"))
        input['updated_at'] = new Date(moment().format("YYYY-MM-DD HH:mm:ss"))
        return this.connectCommentByRepository.save(input);
      }


      async countTotalComment(id: string): Promise<Number> {
        const [products, count] = await this.connectCommentByRepository.findAndCount({
          where: { connect_post_id: id },
        });

        return count
      }
    
}