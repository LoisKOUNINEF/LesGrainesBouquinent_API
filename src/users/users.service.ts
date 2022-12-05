import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WelcomeService } from 'src/mailer/welcome/welcome.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private welcomeService: WelcomeService,
  ) {}

  findAll(email?: string): Promise<User> | Promise<User[]> {
    if (email) {
      return this.findOneByEmail(email);
    }
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: id },
      relations: { books: true },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email: email },
    });
  }

  findOneByName(name: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { name: name },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userEmail = await this.findOneByEmail(createUserDto.email);
    const userName = await this.findOneByName(createUserDto.name);
    if (userEmail || userName) {
      throw new ForbiddenException({
        msg: 'User with this email or name already exists',
      });
    }
    const newUser = this.usersRepository.create(createUserDto);

    await this.welcomeService.sendWelcome(newUser.email);

    return await this.usersRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    return await this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);

    return await this.usersRepository.remove(user);
  }
}
