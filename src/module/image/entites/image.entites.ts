import { User } from 'src/module/user/entities/user.entities';
import {
  AfterInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: `image` })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  url: string;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.images)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @AfterInsert()
  resetActives() {
    this.is_active = false;
  }
}
