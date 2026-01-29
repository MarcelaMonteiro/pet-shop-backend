import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, PrismaService, AuthService],
})
export class AppointmentsModule {}
