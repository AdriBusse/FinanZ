import { SavingTransaction } from "./SavingTransaction";
import { SavingDepot } from "./SavingDepot";
import { ETFTransaction } from "./ETFTransaction";
import { ETFSnapshot } from "./ETFSnapshot";
import { ETF } from "./ETF";
import { IsEmail, Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

@ObjectType()
@Entity({ name: "Users" })
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  @Length(3, 255, { message: "Must be at least 3 characters long" })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Column()
  @Length(6, 255, { message: "Must be at least 6 characters long" })
  @Exclude()
  password: string;

  @Field()
  @Column("text", { unique: true })
  @IsEmail(undefined, { message: "Must be a valid email address" })
  @Length(1, 255, { message: "Email is empty" })
  email: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  @Field(() => [ETF])
  @OneToMany(() => ETF, (etf) => etf.user)
  etfs: ETF[];

  @Field(() => [ETFSnapshot])
  @OneToMany(() => ETFSnapshot, (etfs) => etfs.user)
  etfSnapshots: ETFSnapshot[];

  @Field(() => [ETFTransaction])
  @OneToMany(() => ETFTransaction, (etft) => etft.user)
  etfTransactions: ETFTransaction[];

  @Field(() => [SavingDepot])
  @OneToMany(() => SavingDepot, (savingD) => savingD.user)
  savingDepots: SavingDepot[];

  @Field(() => [SavingTransaction])
  @OneToMany(() => SavingTransaction, (savingT) => savingT.user)
  savingTransactions: SavingTransaction[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
