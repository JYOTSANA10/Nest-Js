import { Module } from '@nestjs/common';
import { AuthContoller } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule ,ConfigService} from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AdminRoleGuard } from './admin-role.guard';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';



@Module({
  imports: [JwtModule.register({}), ConfigModule, AuthModule,MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      transport: {
        host: config.get('EMAIL_HOST'),
        secure: false,
        auth: {
          user: config.get('EMAIL_USER'),
          pass: config.get('EMAIL_PASSWORD'),
        },
      },
      defaults: {
        from: '<sendgrid_from_email_address>'
      },
      template: {
        dir: join(__dirname, './templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    inject: [ConfigService]
  }), ConfigModule.forRoot()],
  controllers: [AuthContoller],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
