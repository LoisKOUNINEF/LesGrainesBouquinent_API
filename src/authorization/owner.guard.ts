import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ownerCheck = this.reflector.getAllAndOverride<boolean>('owner', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!ownerCheck) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const owner = request.params;

    if (request.user.isAdmin || request.user.id === owner.id) {
      return true;
    }
    return false;
  }
}
