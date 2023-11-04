import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AtGuard } from './modules/auth/guards/at.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { S3ManagerModule } from './modules/s3-manager/s3-manager.module';
import { FileModule } from './modules/file/file.module';


@Module({
  imports: [
    UsersModule, 
    AuthModule, 
    PrismaModule,
    ConfigModule.forRoot(),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    ProductModule,
    S3ManagerModule,
    FileModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AtGuard
    // },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
  ],
})
export class AppModule {}
