import { IsDateString, IsIn, IsString } from 'class-validator';

export class CreateAppointmentDTO {
  @IsString()
  petName: string;

  @IsIn(['SMALL', 'MEDIUM', 'LARGE'])
  petSize: 'SMALL' | 'MEDIUM' | 'LARGE';

  @IsIn(['BATH', 'GROOMING', 'BATH_AND_GROOMING'])
  serviceType: 'BATH' | 'GROOMING' | 'BATH_AND_GROOMING';

  @IsDateString()
  date: string;

  @IsString()
  time: string;
}
