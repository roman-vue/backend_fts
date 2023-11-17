import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return false;
    }

    const token = this.extractTokenFromHeader(request.headers.authorization);

    try {
      const decoded = jwt.verify(token, 'secret');

      request.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }

  private extractTokenFromHeader(authHeader: string): string {
    const tokenRegex = /Bearer\s(.+)/;
    const tokenMatches = authHeader.match(tokenRegex);

    if (tokenMatches && tokenMatches.length > 1) {
      return tokenMatches[1];
    }
    throw new Error('Invalid token format');
  }
}
