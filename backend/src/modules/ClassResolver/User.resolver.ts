import { ETFTransaction } from "./../../entity/ETFTransaction";
import { ETFSnapshot } from "./../../entity/ETFSnapshot";
import { SavingTransaction } from "../../entity/SavingTransaction";
import { FieldResolver, Resolver, ResolverInterface, Root } from "type-graphql";
import { SavingDepot } from "../../entity/SavingDepot";
import { User } from "../../entity/User";
import { ETF } from "../../entity/ETF";

@Resolver(() => User)
export class UserResolver implements ResolverInterface<User> {
  @FieldResolver()
  async etfs(@Root() user: User): Promise<ETF[]> {
    const etfs = await User.findOneOrFail(user.id, {
      relations: ["etfs"],
    });

    return etfs.etfs;
  }
  @FieldResolver()
  async etfSnapshots(@Root() user: User): Promise<ETFSnapshot[]> {
    const userRec = await User.findOneOrFail(user.id, {
      relations: ["etfSnapshots"],
    });

    return userRec.etfSnapshots;
  }
  @FieldResolver()
  async etfTransactions(@Root() user: User): Promise<ETFTransaction[]> {
    const userRec = await User.findOneOrFail(user.id, {
      relations: ["etfTransactions"],
    });

    return userRec.etfTransactions;
  }
  @FieldResolver()
  async savingDepots(@Root() user: User): Promise<SavingDepot[]> {
    const userRec = await User.findOneOrFail(user.id, {
      relations: ["savingDepots"],
    });

    return userRec.savingDepots;
  }
  @FieldResolver()
  async savingTransactions(@Root() user: User): Promise<SavingTransaction[]> {
    const userRec = await User.findOneOrFail(user.id, {
      relations: ["savingTransactions"],
    });

    return userRec.savingTransactions;
  }
}