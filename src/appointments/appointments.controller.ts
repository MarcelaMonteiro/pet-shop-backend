import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDTO } from './dtos/create-appointment';
import { PreviewAppointmentDTO } from './dtos/preview-appointment';
import { AppointmentResponseDTO } from './dtos/response-appointment';
import { AuthGuard } from '@nestjs/passport';

@Controller('appointments')
@UseGuards(AuthGuard('jwt'))
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('preview')
  preview(@Body() dto: PreviewAppointmentDTO): { price: number } {
    return this.appointmentsService.preview(dto);
  }

  @Post()
  create(
    @Body() data: CreateAppointmentDTO,
    @Req() req: Request & { user: { id: number } },
  ): Promise<AppointmentResponseDTO> {
    return this.appointmentsService.create(data, req.user.id);
  }

  @Get('me')
  listMine(
    @Req() req: Request & { user: { id: number } },
  ): Promise<AppointmentResponseDTO[]> {
    return this.appointmentsService.listMine(req.user.id);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() req: Request & { user: { id: number } },
  ): Promise<{ ok: true }> {
    return this.appointmentsService.delete(Number(id), req.user.id);
  }
}
