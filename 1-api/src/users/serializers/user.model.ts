import { Exclude, Expose } from 'class-transformer';

import { Address } from '../types/address';
import { Gender } from '../types/gender';

export class UserModel {
  id: number;
  email: string;

  name: string;
  isSubscribe: boolean;
  address: Address;
  gender: Gender;
  birthdate: string;

  constructor(partial: Partial<UserModel>) {
    Object.assign(this, partial);
  }

  @Exclude()
  password: string;

  @Expose()
  get age(): number {
    const ageDate = new Date(
      new Date().getTime() - new Date(this.birthdate).getTime(),
    );
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
