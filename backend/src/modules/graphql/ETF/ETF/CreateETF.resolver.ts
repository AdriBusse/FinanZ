import { ETF } from "../../../../entity/ETF";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../../middleware/isAuth";
import { MyContext } from "../../../../types/MyContext";

@Resolver(ETF)
export class CreateETFResolver {
  @Mutation(() => ETF)
  @UseMiddleware(isAuth)
  async createETF(
    @Arg("name") name: string,
    @Arg("short") short: string,
    @Ctx() ctx: MyContext
  ): Promise<ETF> {
    const user = ctx.res.locals.user;
    const etf = new ETF();
    etf.name = name;
    etf.short = short;
    etf.user = user;

    await etf.save();
    return etf;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
