import { Controller, UseGuards, Request, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({passthrough: true}) res){
    const { accessToken } = await this.authService.login(req.user)
    res.cookie('accessToken', accessToken, {
      httpOnly: true
    })
    return { message: 'Successfully logged in '}
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({passthrough: true}) res){
    res.clearCookie('accessToken', {
      httpOnly: true
    })
    return { message: 'Successfully logged out '}
  }
}
