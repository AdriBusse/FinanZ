import { SavingDepot } from "../../../entity/SavingDepot";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../../types/MyContext";

@Resolver(SavingDepot)
export class CreateSavingDepotResolver {
  @Mutation(() => SavingDepot)
  @UseMiddleware(isAuth)
  async createSavingDepot(
    @Arg("name") name: string,
    @Arg("short") short: string,
    @Ctx() ctx: MyContext
  ): Promise<SavingDepot> {
    const user = ctx.res.locals.user;

    const newDepot = new SavingDepot();
    newDepot.name = name;
    newDepot.short = short;
    newDepot.user = user;

    await newDepot.save();
    return newDepot;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
