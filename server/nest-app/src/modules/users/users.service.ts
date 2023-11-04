import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user) {
    return await this.userRepository.upsert(user);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    return await this.userRepository.findUnique(id);
  }
  async findByEmail(email: string) {
    return true;
  }
}
