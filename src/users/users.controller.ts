import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body) {
    console.log(body);
    return 'signup';
  }
}

// DTO란
/**
 * 클라이언트가 바디에 실어서 보냈을 때!
 * DTO 객체로 실어서 validation을 하고
 * 타이핑 검사도 한 다음에 안전하게 컨트롤러로 보내고
 * 서비스로 보내고 DB로 보내는 게 DTO임
 */
