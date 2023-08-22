import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { IsUrl, IsDecimal } from 'class-validator';
import { User } from '../../users/entities/user.entity'; // Подставьте правильный путь к модели User

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @Column()
  @IsUrl()
  item: string;

  @Column()
  @IsDecimal()
  amount: number;

  @Column({ type: 'boolean', default: false })
  hidden: boolean;
}
