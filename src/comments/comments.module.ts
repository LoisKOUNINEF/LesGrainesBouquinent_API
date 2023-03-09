import { Module } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './service/comments.service';
import { CommentsController } from './controller/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, BooksModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
