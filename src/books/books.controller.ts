import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/authentication/guards/authenticated.guard';
import { Owner } from 'src/authorization/owner.decorator';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthenticatedGuard)
  @ApiCreatedResponse({ type: Book, description: 'create a new Book entry.' })
  @ApiBadRequestResponse()
  @Post()
  create(@Request() req, @Body() createBookDto: CreateBookDto) {
    return this.booksService.create(req.user.id, createBookDto);
  }

  @Get()
  findAll(
    @Query('title') title?: string,
    @Query('author') author?: string,
  ): Promise<Book[]> {
    return this.booksService.findAll(title, author);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Owner(true)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Owner(true)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
