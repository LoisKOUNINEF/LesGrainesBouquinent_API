import { ForbiddenException, NotFoundException } from '@nestjs/common';

export function notFound() {
  throw new NotFoundException({
    msg: 'User not found.',
  });
}

export function alreadyExists() {
  throw new ForbiddenException({
    msg: 'User with this email or name already exists',
  });
}
