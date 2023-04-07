import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  social_id!: bigint;

  @Column()
  email!: string;

  @Column()
  nickname!: string;

  @Column()
  access_user!: string;

  @Column()
  profile_image!: string;

  @Column()
  day_count!: number;
}
