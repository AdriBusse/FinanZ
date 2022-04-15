import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { ETF } from "./ETF";
import { User } from "./User";

@Entity()
@ObjectType()
export class ETFSnapshot extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Field({ description: "How much is the ETF worth this month" })
  @Column({ type: "float", default: 0 })
  value: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.etfSnapshots)
  user: User;

  @Field(() => ETF)
  @ManyToOne(() => ETF, (etf) => etf.snapshots, {
    onDelete: "CASCADE",
  })
  etf: ETF;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
