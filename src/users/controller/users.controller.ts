import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/authentication/guards/local-auth.guard';
import { Admin } from 'src/authorization/admin.decorator';
import { Owner } from 'src/authorization/owner.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../service/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true, description: 'finds all users' })
  @ApiQuery({ name: 'email', required: false })
  @Get()
  @Admin(true)
  getUsers(@Query('email') email?: string): Promise<User[]> | Promise<User> {
    return this.usersService.findAll(email);
  }

  @ApiOkResponse({ type: User, description: 'finds a specific user' })
  @ApiNotFoundResponse()
  @Get(':id')
  @Owner(true)
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiCreatedResponse({ type: User, description: 'create new user' })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @Owner(true)
  update(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @Owner(true)
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, err: Error): any {
    if (err) {
      return err.message;
    }
    return { msg: `User ${req.user.email} logged In.` };
  }

  @Post('logout')
  logout(@Request() req): any {
    req.logout(function (err: Error) {
      if (err) {
        return err.message;
      }
    });
    return { msg: 'Logged out' };
  }
}
