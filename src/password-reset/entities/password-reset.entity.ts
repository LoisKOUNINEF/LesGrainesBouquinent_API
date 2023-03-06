import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from 'common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class PasswordReset extends CommonEntity {
  @ApiProperty()
  @Column()
  email: string;
}
