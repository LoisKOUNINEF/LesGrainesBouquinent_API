import { BadRequestException, NotFoundException } from '@nestjs/common';

export function passwordLength() {
  throw new BadRequestException({
    msg: 'Password must be at least 10 characters',
  });
}

export function tokenNotFound() {
  throw new NotFoundException({
    msg: 'no password reset token found.',
  });
}

export function noUser() {
  throw new BadRequestException({
    msg: 'No User with this email.',
  });
}
