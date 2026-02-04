import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

type RequestWithUser = Request & { user?: any };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const token = this.extractTokenFromHeader(request);
    console.log('token', token);
    if (!token) throw new UnauthorizedException('Access token not found');

    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log('payload', payload);
      request.user = payload;
      return true;
    } catch (e) {
      console.log('error', e);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // 1. Authorization header (fallback)
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const [type, token] = authHeader.split(' ');
      if (type === 'Bearer') return token;
    }

    return undefined;
  }
}
