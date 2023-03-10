import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from 'src/users/service/users.service';
import { MockType } from 'test/types/mock-type';
import { Repository } from 'typeorm';
import { CommentsService } from './comments.service';
import { Comment } from '../entities/comment.entity';
import { BooksService } from 'src/books/service/books.service';

describe('CommentsService', () => {
  let service: CommentsService;
  const commentsRepositoryMock: MockType<Repository<Comment>> = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: commentsRepositoryMock,
        },
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
        {
          provide: BooksService,
          useValue: createMock<BooksService>(),
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
