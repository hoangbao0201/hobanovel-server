import {
  Controller, Get, Param
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET .../api/users/me
  // @UseGuards(MyJwtGuard)
  // @Get('me')
  // async me(@GetUser() user: User) {
  //   return user;
  // }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.userDetail(username); 
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
