import { Module } from '@nestjs/common';
import { AuthContoller } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AdminRoleGuard } from './admin-role.guard';

@Module({
  imports: [JwtModule.register({}), ConfigModule, AuthModule],
  controllers: [AuthContoller],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
