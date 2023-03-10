import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { bookNotFound } from 'common/exceptions/books.exceptions';
import { UsersService } from 'src/users/service/users.service';
import { ILike, Repository } from 'typeorm';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '../entities/book.entity';
import { PictureService } from './picture.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    private usersService: UsersService,
    private pictureService: PictureService,
  ) {}

  async create(userId: string, createBookDto: CreateBookDto): Promise<Book> {
    const user = await this.usersService.findOne(userId);
    const pictureUrl = await this.pictureService.fetchImage(createBookDto);
    const newBook = this.booksRepository.create({
      user,
      pictureUrl,
      ...createBookDto,
    });

    return await this.booksRepository.save(newBook);
  }

  findAll(title?: string, author?: string): Promise<Book[]> {
    if (title || author) {
      return this.booksRepository.find({
        where: {
          title: ILike(
            `%${title.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}%`,
          ),
        } || {
          author: `%${author}%`,
        },
      });
    }
    return this.booksRepository.find();
  }

  findOne(id: string): Promise<Book> {
    const book = this.booksRepository.findOne({
      where: { id: id },
      relations: {
        comments: true,
        user: true,
      },
    });

    if (!book) {
      bookNotFound();
    }

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    await this.booksRepository.save(Object.assign(book, updateBookDto));
    return book;
  }

  async remove(id: string) {
    const book = await this.findOne(id);

    return this.booksRepository.remove(book);
  }
}
