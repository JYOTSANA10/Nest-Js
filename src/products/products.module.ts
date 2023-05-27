import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
