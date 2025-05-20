export interface INewDoctorFormValues {
  first_name: string;
  middle_name: string;
  last_name: string;
  qualification: string;
  email: string;
  password: string;
  confirmPassword: string;
  specialty: string | number;
  specialties: number[];
  roles: number[];
}
