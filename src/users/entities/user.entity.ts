import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, MinLength } from 'class-validator';
import { Book } from 'src/books/entities/book.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CommonEntity } from 'common/entities/common.entity';

@Entity()
export class User extends CommonEntity {
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

  @ApiProperty({ type: () => Book })
  @OneToMany(() => Book, (book) => book.user, {
    cascade: true,
  })
  books: Book[];

  @ApiProperty({ type: () => Comment })
  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, Number(10));
  }
}
