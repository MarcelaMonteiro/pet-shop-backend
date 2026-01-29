import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { PrismaService } from './prisma/prisma.service';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [AuthModule, AppointmentsModule],
  controllers: [],
  providers: [AuthController, PrismaService],
})
export class AppModule {}
