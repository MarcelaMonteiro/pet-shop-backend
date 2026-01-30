import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentDTO } from './dtos/appointment';
import { PreviewAppointmentDTO } from './dtos/preview-appointment';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('appointments')
@UseGuards(AuthGuard('jwt'))
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('preview')
  preview(@Body() data: PreviewAppointmentDTO) {
    return this.appointmentsService.preview(data);
  }

  @Post('create')
  create(
    @Body() data: AppointmentDTO,
    @Req() req: Request & { user: { id: number } },
  ) {
    return this.appointmentsService.create(data, req.user.id);
  }

  @Get('me')
  listMine(@Req() req: Request & { user: { id: number } }) {
    return this.appointmentsService.listMine(req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(
    @Param('id') id: string,
    @Req() req: Request & { user: { id: number } },
  ) {
    return this.appointmentsService.delete(Number(id), req.user.id);
  }
}
