import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/books/entities/book.entity';
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
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ApiProperty({ type: () => Book })
  @ManyToOne(() => Book, (book) => book.comments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  book: Book;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  user: User;

  @ApiProperty({ type: () => Comment })
  @ManyToOne(() => Comment, (comment) => comment.childComments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment, {
    cascade: true,
  })
  childComments: Comment[];
}
