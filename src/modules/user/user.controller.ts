import { Controller, Get } from '@nestjs/common';
import UserService from './user.service';

@Controller('/User')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/User')
  async handleUser() {
    return this.userService.getUser();
  }
}
