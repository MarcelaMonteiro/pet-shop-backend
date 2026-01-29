import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtPayload } from './jwt-payload';

type RequestWithUser = Request & { user: JwtPayload };

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    return this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SignInDTO) {
    return this.authService.signin(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() request: RequestWithUser) {
    return request.user;
  }
}
