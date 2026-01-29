import { IsEnum } from 'class-validator';
import { PetSize, ServiceType } from '../appointments.types';

export class PreviewAppointmentDTO {
  @IsEnum(PetSize)
  petSize: PetSize;

  @IsEnum(ServiceType)
  serviceType: ServiceType;
}
