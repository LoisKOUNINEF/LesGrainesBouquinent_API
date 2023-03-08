import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationService } from './service/authentication.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './strategies/session.serializer';
import { AuthenticationController } from './controller/authentication.controller';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthenticationService, LocalStrategy, SessionSerializer],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
