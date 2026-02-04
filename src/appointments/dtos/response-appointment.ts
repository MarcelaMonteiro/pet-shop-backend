export class AppointmentResponseDTO {
  id: number;
  petName: string;
  petSize: 'SMALL' | 'MEDIUM' | 'LARGE';
  serviceType: 'BATH' | 'GROOMING' | 'BATH_AND_GROOMING';
  date: string;
  time: string;
  price: number;
}
