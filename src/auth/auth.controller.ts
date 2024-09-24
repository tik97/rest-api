import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.body.username, req.body.password);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
