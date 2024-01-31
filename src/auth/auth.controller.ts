import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { RefreshJwtGuard } from './guard/refresh.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

@Controller('/api/auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    // POST .../auth/register
    @Post('/register')
    register(@Body() body: RegisterDTO) {
        return this.authService.register(body);
    }

    // POST .../auth/login
    @Post('/login')
    login(@Body() body: LoginDTO) {
        return this.authService.login(body);
    }

    // POST .../auth/refresh
    @UseGuards(RefreshJwtGuard)
    @Post('/refresh')
    refreshToken(@Request() req) {
        return this.authService.refreshToken(req.user);
    }
}
