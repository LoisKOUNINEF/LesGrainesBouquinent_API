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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/authentication/authenticated.guard';
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
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(
    @Query('title') title?: string,
    @Query('author') author?: string,
  ): Promise<Book[]> {
    return this.booksService.findAll(title, author);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Owner(true)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Owner(true)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
