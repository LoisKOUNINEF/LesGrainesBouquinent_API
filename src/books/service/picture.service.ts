import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class PictureService {
  async fetchImage(book: CreateBookDto): Promise<string> {
    const bookTitleForSearch = book.title.split(' ').join('+');

    const apiResponse = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookTitleForSearch}+inauthor:${book.author}`,
    ).then((response) => response.json());

    if (!apiResponse.items || !apiResponse.items[0].volumeInfo.imageLinks) {
      return 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    }

    const thumbnailUrl = apiResponse.items[0].volumeInfo.imageLinks.thumbnail;

    return thumbnailUrl;
  }
}
