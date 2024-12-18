import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import * as Validator from 'class-validator';

@Index("uq_order_cart_id", ["cartId"], { unique: true })
@Entity("order")
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true })
  orderId: number;

  @Column({type:"int",
    name: "cart_id",
    unique: true,
    unsigned: true,
  })
  cartId: number;

  @Column({type:"enum",
    enum: ["rejected", "accepted", "shipped", "pending"],
    default: () => "'pending'",
  })
  @Validator.IsNotEmpty()
  @Validator.IsIn(["rejected", "accepted", "shipped", "pending"])
  @Validator.IsString()
  status: "rejected" | "accepted" | "shipped" | "pending";

  @Column({type:"timestamp", name: "created_at", default: () => "'now()'" })
  createdAt: Date;

  @OneToOne(() => Cart, (cart) => cart.order, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
  cart: Cart;
}
