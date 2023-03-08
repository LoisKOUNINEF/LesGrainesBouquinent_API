import { Controller, Get, UseGuards } from '@nestjs/common';
import { Admin } from 'src/authorization/admin.decorator';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthenticationController {
  @Get('auth')
  @UseGuards(AuthenticatedGuard)
  checkAuth(): boolean {
    return true;
  }

  @Get('admin')
  @Admin(true)
  checkIfAdmin(): boolean {
    return true;
  }
}
