// external imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// internal imports
import { hashPassword } from '../common/password.js';
import { User } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await hashPassword(createUserDto.password),
      role: createUserDto.role,
    });
    const savedUser = await this.usersRepository.save(user);

    return this.usersRepository.findOneByOrFail({ id: savedUser.id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    this.usersRepository.merge(user, updateUserDto);

    if (updateUserDto.password) {
      user.password = await hashPassword(updateUserDto.password);
    }
    await this.usersRepository.save(user);

    return this.usersRepository.findOneByOrFail({ id });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
