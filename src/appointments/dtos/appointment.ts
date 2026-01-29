import { IsDateString, IsEnum, IsString } from 'class-validator';
import { PetSize, ServiceType } from '../appointments.types';

export class AppointmentDTO {
  @IsEnum(PetSize)
  petSize: PetSize;

  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @IsDateString()
  date: string;

  @IsString()
  time: string;
}
