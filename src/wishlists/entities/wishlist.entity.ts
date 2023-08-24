import { Length, IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  // @Column()
  // @Length(1500)
  // description: string;

  @Column()
  @IsUrl()
  image: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @OneToMany(() => Wish, (wish) => wish)
  items: Wish[];
}
