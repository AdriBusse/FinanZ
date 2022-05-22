import { ETFSnapshot } from "../../../entity/ETFSnapshot";
import { FieldResolver, Resolver, ResolverInterface, Root } from "type-graphql";
import { ETF } from "../../../entity/ETF";
import { User } from "../../../entity/User";

@Resolver(() => ETFSnapshot)
export class ETFSnapshotResolver implements ResolverInterface<ETFSnapshot> {
  @FieldResolver()
  async etf(@Root() etfSnapshot: ETFSnapshot): Promise<ETF> {
    const etf = await ETFSnapshot.findOneOrFail(
      { id: etfSnapshot.id },
      { relations: ["etf"] }
    );

    return etf.etf;
  }
  @FieldResolver()
  async user(@Root() etfSnapshot: ETFSnapshot): Promise<User> {
    const etf = await ETFSnapshot.findOneOrFail(
      { id: etfSnapshot.id },
      { relations: ["user"] }
    );

    return etf.user;
  }
}
