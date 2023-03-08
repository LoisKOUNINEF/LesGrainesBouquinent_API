import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from 'common/entities/common.entity';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends CommonEntity {
  @ApiProperty()
  @Column('text')
  content: string;

  @ApiProperty({ type: () => Book })
  @ManyToOne(() => Book, (book) => book.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  book: Book;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
