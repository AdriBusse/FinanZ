import { ETFSnapshot } from "./../../../entity/ETFSnapshot";
import { ETF } from "./../../../entity/ETF";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../../types/MyContext";

@Resolver(ETFSnapshot)
export class CreateETFSnapshotResolver {
  @Mutation(() => ETFSnapshot)
  @UseMiddleware(isAuth)
  async createETFSnapshot(
    @Arg("etfId") depotId: string,
    @Arg("value") value: number,
    @Arg("date", { nullable: true, defaultValue: new Date() }) date: string,
    @Ctx() ctx: MyContext
  ): Promise<ETFSnapshot> {
    const user = ctx.res.locals.user;
    const etf = await ETF.findOneOrFail({ id: depotId, user });
    const etfSnapshot = new ETFSnapshot();
    etfSnapshot.value = value;
    etfSnapshot.etf = etf;
    etfSnapshot.createdAt = new Date(date);
    etfSnapshot.user = user;

    await etfSnapshot.save();
    return etfSnapshot;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
