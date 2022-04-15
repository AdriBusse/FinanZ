import { ETFSnapshot } from "./ETFSnapshot";
import { ETFTransaction } from "./ETFTransaction";
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
export class ETF extends BaseEntity {
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
  worth: number;

  @Field()
  deposited: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.etfs)
  user: User;

  @Field(() => [ETFTransaction], { nullable: true })
  @OneToMany(() => ETFTransaction, (trans) => trans.etf)
  transactions: ETFTransaction[];

  @Field(() => [ETFSnapshot], { nullable: true })
  @OneToMany(() => ETFSnapshot, (trans) => trans.etf)
  snapshots: ETFSnapshot[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
