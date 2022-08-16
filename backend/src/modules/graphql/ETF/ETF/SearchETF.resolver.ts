import { ETFSearch } from "./../../../../entity/APITypes/ETFSearch";
import { LemonAPI } from "./../../../Services/LemonAPI";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class SearchETFResolver {
  @Query(() => ETFSearch)
  //@UseMiddleware(isAuth)
  async searchETF(@Arg("searchKey") searchKey: string): Promise<ETFSearch> {
    //const user = ctx.res.locals.user;
    const etfs = await LemonAPI.searchETF(searchKey);
    console.log("res______-");
    const res = new ETFSearch(etfs);

    console.log(res);

    return res;
  }
  catch(error: { message: string | undefined }) {
    console.log(error);
    throw new Error(error.message);
  }
}
