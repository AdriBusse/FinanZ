import "reflect-metadata";
import { createConnection } from "typeorm";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { createSchema } from "./utils/createSchema";
import cors from "cors";
import cookieParser from "cookie-parser";
import user from "./modules/middleware/user";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config({ path: __dirname + "/../.env" });

const start = async () => {
  try {
    await createConnection();
  } catch (error) {
    console.log(error);
  }

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }: any) => ({ req, res }), // just for access the context
  });

  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin: "*",
    })
  );
  app.use(Express.static(__dirname + "/../public"));

  app.use(cookieParser());
  app.use(user);

  app.get("/ping", (_, res) => {
    res.send("pong");
  });

  await apolloServer
    .start()
    .then(() => console.log("GraphQL Server started"))
    .catch((err) => {
      console.error("ERROR:___" + err);
    });
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "*",
    },
  });
  console.log("new");

  app.listen(4000, () => {
    console.log("Server listen on port 4000");
  });
};
start();
