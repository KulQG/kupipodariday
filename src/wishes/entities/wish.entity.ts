import { Length, IsUrl, IsDecimal, IsInt } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Подставьте правильный путь к модели User

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsDecimal({ decimal_digits: '2' })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsDecimal({ decimal_digits: '2' })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: number;

  @Column({ length: 1024 })
  @Length(1, 1024)
  description: string;

  @ManyToMany(() => User, (user) => user.id)
  offers: number;

  @Column({ type: 'float', default: 0 })
  @IsInt()
  copied: number;
}
