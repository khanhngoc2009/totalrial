import { AutoMap } from '@automapper/classes';
import { User } from 'src/module/user/entities/user.entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: `image` })
export class Image {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ default: true })
  is_active: boolean;

  @AutoMap()
  @Column()
  url: string;

  @AutoMap()
  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.images)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
