import { Cart } from 'src/module/cart/Cart';
import { Image } from 'src/module/image/entites/image.entites';
import {
  BeforeRemove,
  Column,
  Entity,
  getRepository,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @Column({ nullable: true })
  token: string;

  @Column({ default: 1 })
  role: number;

  @BeforeRemove()
  async removeImage() {
    const userReponsitory = getRepository(Image);
    const images = await userReponsitory.find({ where: { user_id: this.id } });
    if (images) {
      await getRepository(Image).remove(images);
    }
  }
}
