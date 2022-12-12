import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from '../entities/comment.entity';

export class CreateCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  book: Book;

  @ApiProperty()
  user: User;

  @ApiProperty()
  parentComment: Comment;
}
