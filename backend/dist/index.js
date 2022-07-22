"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const createSchema_1 = require("./utils/createSchema");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_1 = __importDefault(require("./modules/middleware/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/../.env" });
const start = async () => {
    try {
        await (0, typeorm_1.createConnection)();
    }
    catch (error) {
        console.log(error);
    }
    const schema = await (0, createSchema_1.createSchema)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
        context: ({ req, res }) => ({ req, res }),
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        credentials: true,
        origin: "*",
    }));
    app.use(express_1.default.static(__dirname + "/../public"));
    app.use((0, cookie_parser_1.default)());
    app.use(user_1.default);
    app.get("/ping", (_, res) => {
        res.send("pong");
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: "*",
        },
    });
    app.listen(4000, () => {
        console.log("Server listen on port 4000");
    });
};
start();
//# sourceMappingURL=index.js.map