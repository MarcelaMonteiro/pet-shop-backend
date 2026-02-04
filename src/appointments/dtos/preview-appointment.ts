import { IsIn } from 'class-validator';

export class PreviewAppointmentDTO {
  @IsIn(['SMALL', 'MEDIUM', 'LARGE'])
  petSize: 'SMALL' | 'MEDIUM' | 'LARGE';

  @IsIn(['BATH', 'GROOMING', 'BATH_AND_GROOMING'])
  serviceType: 'BATH' | 'GROOMING' | 'BATH_AND_GROOMING';
}
