import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../../common/interfaces/user.interface';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(email: string): Promise<User | undefined> {
    return await this.prismaService.user.findFirst({ where: { email: email } });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany({});
  }

  async findUnique(id: number): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id: id} });
  }

  async logout(userId: number): Promise<boolean> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRT: null,
      },
    });
    return true;
  }
  async updateRefreshTokenHash(
    userId: number,
    hashedRT: string,
  ): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRT,
      },
    });
  }

  async upsert(user: Partial<User>): Promise<User> {
    return await this.prismaService.user.upsert({
      create: {
        name: user.name,
        phone: user.phone,
        hashedPassword: user?.hashedPassword,
        email: user.email,
        updatedAt: new Date().toISOString(),
        lastLoggedInTime: new Date().toISOString(),
        role: user.role,
      },
      update: {
        lastLoggedInTime: new Date().toISOString(),
      },
      where: { id: user.id },
    });
  }
  async create(user: Partial<User>) {
    return await this.prismaService.user.create({
      data: {
        email: user.email,
        phone: user.phone,
        name: user.name,
        updatedAt: new Date().toISOString(),
        lastLoggedInTime: new Date().toISOString(),
        hashedPassword: user?.hashedPassword,
        role: user.role,
      },
    });
  }
  async findById(id: number): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async updatePassword(id: number, hashedPassword: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: {
        hashedPassword: hashedPassword,
      },
    });
  }
}
