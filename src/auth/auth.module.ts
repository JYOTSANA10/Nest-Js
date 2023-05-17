import { Module } from "@nestjs/common";
import { AuthContoller } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "prisma/prisma.service";


 @Module({
    imports: [PrismaService],
    controllers:[AuthContoller],
    providers:[AuthService],
 })

export class AuthModule{}