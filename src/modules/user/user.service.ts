import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserService {
  async getUser() {
    return '1';
  }
}
