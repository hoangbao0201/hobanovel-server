import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
