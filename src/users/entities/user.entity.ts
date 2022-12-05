import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, MinLength } from 'class-validator';
import { Book } from 'src/books/entities/book.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column()
  @MinLength(10)
  @ApiProperty()
  password: string;

  @Column({ default: false })
  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ApiProperty()
  @OneToMany(() => Book, (book) => book.user, {
    cascade: true,
  })
  books: Book[];

  @ApiProperty()
  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, Number(10));
  }
}
