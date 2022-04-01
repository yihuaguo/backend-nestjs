import { Controller, Get } from '@nestjs/common';
import IndexService from './index.service';

@Controller('/index')
export default class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get('/index')
  async handleIndex() {
    return this.indexService.getIndex();
  }
}
