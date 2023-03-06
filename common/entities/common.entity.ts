import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
