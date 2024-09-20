import { UserEntity } from '../users/entity/user.entity';
import { Gender } from '../users/types/gender';

export const users: UserEntity[] = [
  {
    id: 1,
    email: 'test@gmail.com',
    name: 'test',
    birthdate: '1994-12-10T00:00:00',
    isSubscribe: true,
    gender: Gender.MALE,
    password: 'Testing1!',
    address: {
      plot: 'test',
      road: 'Sukhumvit',
      subdistrict: 'Bangna',
      district: 'Bangna',
      province: 'Bangkok',
      postalCode: '20160',
    },
  },
  {
    id: 2,
    email: 'test2@gmail.com',
    name: 'test2',
    password: 'testing',
    birthdate: '1994-12-10T00:00:00',
    isSubscribe: true,
    gender: Gender.FEMALE,
    address: {
      plot: 'test',
      road: 'Sukhumvit',
      subdistrict: 'Bangna',
      district: 'Bangna',
      province: 'Bangkok',
      postalCode: '20160',
    },
  },
];
