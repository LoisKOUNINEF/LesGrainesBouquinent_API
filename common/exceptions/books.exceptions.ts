import { NotFoundException } from '@nestjs/common';

export function bookNotFound() {
  throw new NotFoundException({
    msg: 'User not found.',
  });
}
