import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './users.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UserService,UserRepository, PrismaService],
  exports: [PrismaService],
})
export class UsersModule {}
