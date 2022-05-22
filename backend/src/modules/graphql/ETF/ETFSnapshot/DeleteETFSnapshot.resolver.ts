import { MyContext } from "../../../../types/MyContext";
import { ETFSnapshot } from "../../../../entity/ETFSnapshot";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../../middleware/isAuth";

@Resolver(ETFSnapshot)
export class DeleteETFSnapshotResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteETFSnapshot(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const user = ctx.res.locals.user;
    const etfSnapshot = await ETFSnapshot.findOneOrFail({ id, user });

    if (!etfSnapshot) {
      throw new Error("Snapshot not found not found");
    }

    await etfSnapshot.remove();
    return true;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
