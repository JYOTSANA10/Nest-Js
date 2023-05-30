import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { MulterModule } from '@nestjs/platform-express';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/guard/user-roles';


@Module({
  imports: [ConfigModule,AuthModule, UserModule,PrismaModule,AdminModule, CategoriesModule, ProductsModule,AccessControlModule.forRoles(roles)],
 
})
export class AppModule {}
