import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/service/users.service';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { commentNotFound } from 'common/exceptions/comments.exceptions';
import { BooksService } from 'src/books/service/books.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    private usersService: UsersService,
    private booksService: BooksService,
  ) {}

  async create(
    userId: string,
    bookId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const user = await this.usersService.findOne(userId);
    const book = await this.booksService.findOne(bookId);

    const newComment = this.commentsRepository.create({
      user,
      book,
      ...createCommentDto,
    });

    return await this.commentsRepository.save(newComment);
  }

  async findAll() {
    return await this.commentsRepository.find();
  }

  async findOne(id: string) {
    const comment = await this.commentsRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
        book: true,
      },
    });

    if (!comment) {
      commentNotFound();
    }

    return comment;
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findOne(id);

    await this.commentsRepository.save(
      Object.assign(comment, updateCommentDto),
    );

    return comment;
  }

  async remove(id: string) {
    const comment = await this.findOne(id);

    return await this.commentsRepository.remove(comment);
  }
}
