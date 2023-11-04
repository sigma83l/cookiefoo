import { Injectable } from '@nestjs/common';
import { Verification } from '@prisma/client';
import { VerificationDto } from './dtos/signup.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findVerification(email: string): Promise<Verification | undefined> {
    return this.prismaService.verification.findFirst({ where: { email } });
  }

  async upsertVarification(
    user: VerificationDto,
    code: string,
  ): Promise<Verification> {
    return this.prismaService.verification.upsert({
      where: { email: user.email },
      create: {
        email: user.email,
        code: code,
        lastResendTime: new Date().toISOString(),
      },
      update: {
        try: { increment: 1 },
        lastResendTime: new Date().toISOString(),
        code: code,
      },
    });
  }
}
