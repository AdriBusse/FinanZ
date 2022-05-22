import {
  Entity,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  DeleteDateColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { ExpenseTransaction } from "./ExpenseTransaction";

@Entity()
@ObjectType()
export class Expense extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Field()
  @Column()
  title: string;

  @Field()
  sum: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.expenseDepots)
  user: User;

  @Field(() => [ExpenseTransaction], { nullable: true })
  @OneToMany(() => ExpenseTransaction, (trans) => trans.expense)
  transactions: ExpenseTransaction[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
