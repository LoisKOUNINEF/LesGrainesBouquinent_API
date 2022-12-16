import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  book: Book;

  user: User;
}
