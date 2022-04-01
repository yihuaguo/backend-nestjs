import { Injectable } from '@nestjs/common';
import Test from 'src/model/Test';

@Injectable()
export default class IndexService {
  async getIndex() {
    const data = await Test.findListByCond({ haha: 1 });
    return data;
  }
}
