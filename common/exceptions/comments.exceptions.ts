import { NotFoundException } from '@nestjs/common';

export function commentNotFound() {
  throw new NotFoundException({
    msg: 'User not found.',
  });
}
