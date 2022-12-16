import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  author: string;

  @Column({ type: 'text' })
  @ApiProperty()
  description: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.books, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  user: User;

  @ApiProperty({ type: () => Comment })
  @OneToMany(() => Comment, (comment) => comment.book, {
    cascade: true,
  })
  comments: Comment[];
}
