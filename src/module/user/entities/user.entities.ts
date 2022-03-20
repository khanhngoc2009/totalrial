import { Image } from 'src/module/image/entites/image.entites';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: `user` })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column()
  user_name: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Image, (img) => img.user)
  images: Image[];

  @Column({ nullable: true })
  token: string;

  @Column({ default: 1 })
  role: number;
}
