import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule,MulterModule.register({
    dest: './public/uploads',
    })],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
