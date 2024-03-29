import { Module } from '@nestjs/common';
import { BooksService } from './service/books.service';
import { BooksController } from './controller/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { UsersModule } from 'src/users/users.module';
import { PictureService } from './service/picture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UsersModule],
  controllers: [BooksController],
  providers: [BooksService, PictureService],
  exports: [BooksService],
})
export class BooksModule {}
