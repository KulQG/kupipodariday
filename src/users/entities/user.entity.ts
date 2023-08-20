import { Length, IsEmail, IsNotEmpty } from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(2, 30)
  username: string;

  @Column({ nullable: true, default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  about?: string;

  @Column({ nullable: true, default: 'https://i.pravatar.cc/300' })
  avatar?: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ nullable: true })
  @OneToMany(() => Wish, (wish) => wish.id)
  wishes: number;

  @Column({ nullable: true })
  @OneToMany(() => Wish, (wish) => wish.offers)
  offers: number;

  @Column({ nullable: true })
  @OneToMany(() => Wishlist, (wishlist) => wishlist.id)
  wishlists: number;
}
