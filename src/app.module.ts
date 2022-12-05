import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CommentsModule } from './comments/comments.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { APP_GUARD } from '@nestjs/core';
import { OwnerGuard } from './authorization/owner.guard';
import { AdminGuard } from './authorization/admin.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    BooksModule,
    CommentsModule,
    AuthenticationModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
    {
      provide: APP_GUARD,
      useClass: OwnerGuard,
    },
  ],
})
export class AppModule {}
