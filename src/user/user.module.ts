import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AdminRoleGuard } from 'src/auth/admin-role.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  controllers: [UserController],

  providers: [UserService, JwtService],
})
export class UserModule {}
