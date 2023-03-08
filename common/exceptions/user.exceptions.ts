import { ForbiddenException, NotFoundException } from '@nestjs/common';

export function userNotFound() {
  throw new NotFoundException({
    msg: 'User not found.',
  });
}

export function userAlreadyExists() {
  throw new ForbiddenException({
    msg: 'User with this email or name already exists',
  });
}
