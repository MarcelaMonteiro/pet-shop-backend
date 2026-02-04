import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateAppointmentDTO } from './dtos/create-appointment';
import { PreviewAppointmentDTO } from './dtos/preview-appointment';
import { AppointmentResponseDTO } from './dtos/response-appointment';

const BASE_PRICE = {
  BATH: 30,
  GROOMING: 50,
  BATH_AND_GROOMING: 70,
} as const;

const SIZE_MULTIPLIER = {
  SMALL: 1,
  MEDIUM: 1.5,
  LARGE: 2,
} as const;

const SELECT_APPOINTMENT = {
  id: true,
  petName: true,
  petSize: true,
  serviceType: true,
  date: true,
  time: true,
  price: true,
} as const;

@Injectable()
export class AppointmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  preview(dto: PreviewAppointmentDTO): { price: number } {
    const base = BASE_PRICE[dto.serviceType];
    const mult = SIZE_MULTIPLIER[dto.petSize];

    // fallback defensivo (evita NaN se algo escapar do DTO)
    if (base === undefined || mult === undefined) {
      throw new BadRequestException('Tipo de serviço ou porte inválido');
    }

    return { price: base * mult };
  }

  async create(
    data: CreateAppointmentDTO,
    userId: number,
  ): Promise<AppointmentResponseDTO> {
    // conflito (date+time únicos)
    const conflict = await this.prismaService.appointment.findFirst({
      where: {
        date: data.date,
        time: data.time,
      },
      select: { id: true },
    });

    if (conflict) {
      throw new BadRequestException('Horário indisponível');
    }

    const base = BASE_PRICE[data.serviceType];
    const mult = SIZE_MULTIPLIER[data.petSize];

    if (base === undefined || mult === undefined) {
      throw new BadRequestException('Tipo de serviço ou porte inválido');
    }

    const price = base * mult;

    return this.prismaService.appointment.create({
      data: {
        userId,
        petName: data.petName,
        petSize: data.petSize,
        serviceType: data.serviceType,
        date: data.date,
        time: data.time,
        price,
      },
      select: SELECT_APPOINTMENT,
    });
  }

  async listMine(userId: number): Promise<AppointmentResponseDTO[]> {
    return this.prismaService.appointment.findMany({
      where: { userId },
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
      select: SELECT_APPOINTMENT,
    });
  }

  async delete(id: number, userId: number): Promise<{ ok: true }> {
    const deleted = await this.prismaService.appointment.deleteMany({
      where: { id, userId },
    });

    if (deleted.count === 0) {
      throw new BadRequestException('Agendamento não encontrado');
    }

    return { ok: true };
  }
}
