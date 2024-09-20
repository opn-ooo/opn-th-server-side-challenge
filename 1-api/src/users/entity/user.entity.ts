import { Address } from '../types/address';
import { Gender } from '../types/gender';

export class UserEntity {
  id: number;
  email: string;
  password: string;
  name: string;
  isSubscribe: boolean;
  address: Address;
  gender: Gender;
  birthdate: string;
}
