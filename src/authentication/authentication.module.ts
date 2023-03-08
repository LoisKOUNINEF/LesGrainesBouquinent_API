import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthenticationService, LocalStrategy, SessionSerializer],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
