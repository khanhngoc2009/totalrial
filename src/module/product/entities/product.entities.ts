import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: `product` })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  productName: string;

  @Column({ nullable: false })
  price: number;

  @Column()
  url: string;

  @Column({ nullable: false })
  status: number;

  @Column({ nullable: false, default: 0 })
  quantity: number;

  @Column({ nullable: false, default: 0 })
  quantityRemain: number;

  @Column({ default: true })
  isDelete: number;
}
