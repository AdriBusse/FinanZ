import { SavingTransaction } from "./SavingTransaction";
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
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@Entity()
@ObjectType()
export class SavingDepot extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  short: string;

  @Field()
  sum: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.savingDepots)
  user: User;

  @Field(() => [SavingTransaction], { nullable: true })
  @OneToMany(() => SavingTransaction, (trans) => trans.depot)
  transactions: SavingTransaction[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
