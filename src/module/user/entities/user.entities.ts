import { AutoMap } from '@automapper/classes';
import { Image } from 'src/module/image/entites/image.entites';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: `user` })
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ nullable: true })
  first_name: string;

  @AutoMap()
  @Column({ nullable: true })
  last_name: string;

  @AutoMap()
  @Column()
  user_name: string;

  @AutoMap()
  @Column()
  phone: string;

  @Column()
  password: string;

  @AutoMap()
  @Column({ default: true })
  is_active: boolean;

  @AutoMap({ typeFn: () => Image })
  @OneToMany(() => Image, (img) => img.user)
  images: Image[];

  @AutoMap()
  @Column()
  token: string;
}
