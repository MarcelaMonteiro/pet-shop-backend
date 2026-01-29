import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppointmentDTO } from './dtos/appointment';
import { PetSize, ServiceType } from './appointments.types';

const BASE_PRICE: Record<ServiceType, number> = {
  BATH: 40,
  GROOMING: 50,
  BATH_AND_GROOMING: 80,
};

const SIZE_MULTIPLIER: Record<PetSize, number> = {
  SMALL: 1,
  MEDIUM: 1.3,
  LARGE: 1.6,
};

@Injectable()
export class AppointmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  preview(dto: Pick<AppointmentDTO, 'petSize' | 'serviceType'>) {
    const price = BASE_PRICE[dto.serviceType] * SIZE_MULTIPLIER[dto.petSize];

    return { price };
  }

  async create(data: AppointmentDTO, userId: number) {
    const conflict = await this.prismaService.appointment.findFirst({
      where: {
        date: data.date,
        time: data.time,
      },
    });

    if (conflict) {
      throw new BadRequestException('Horário indisponível');
    }

    const price = BASE_PRICE[data.serviceType] * SIZE_MULTIPLIER[data.petSize];

    return this.prismaService.appointment.create({
      data: {
        userId,
        serviceType: data.serviceType,
        petSize: data.petSize,
        date: data.date,
        time: data.time,
        price,
      },
    });
  }

  async listMine(userId: number) {
    return await this.prismaService.appointment.findMany({
      where: { userId },
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    });
  }
}
