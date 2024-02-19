import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'date' })
  birtDate: Date;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({ type: 'varchar' })
  address: string;
  
  @Column({ type: 'boolean' })
  subscribe: boolean; 
}
