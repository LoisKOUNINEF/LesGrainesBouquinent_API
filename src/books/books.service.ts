import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ILike, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    private usersService: UsersService,
  ) {}

  async create(userId: string, createBookDto: CreateBookDto): Promise<Book> {
    const user = await this.usersService.findOne(userId);
    const newBook = this.booksRepository.create({ user, ...createBookDto });

    return await this.booksRepository.save(newBook);
  }

  findAll(title?: string, author?: string): Promise<Book[]> {
    if (title || author) {
      return this.booksRepository.find({
        where: {
          title: ILike(
            `%${title.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}%`,
          ),
        } || { author: `%${author}%` },
      });
    }
  }

  findOne(id: string) {
    return this.booksRepository.findOne({
      where: { id: id },
      relations: {
        comments: true,
      },
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    return this.booksRepository.save(Object.assign(book, updateBookDto));
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    return this.booksRepository.remove(book);
  }
}
