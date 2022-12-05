import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CommentsModule } from './comments/comments.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [UsersModule, BooksModule, CommentsModule, FavoritesModule, AuthenticationModule, MailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
