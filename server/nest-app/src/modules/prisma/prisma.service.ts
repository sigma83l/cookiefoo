import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  // constructor() {
  //   super();
  //   this.prisma = new PrismaClient();
  // }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Specify the type of the callback function
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_');

    await this.user.deleteMany(); // Remove the quotes
    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()));
  }
}

