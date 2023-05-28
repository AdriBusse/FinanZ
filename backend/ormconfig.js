module.exports = {
  name: "default",
  type: "postgres",
  host: precess.env.DB_HOST,
  port: precess.env.DB_PORT,
  username: precess.env.DB_USER,
  password: precess.env.DB_PASSWORD,
  database: precess.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: process.env.production
    ? ["./dist/entity/*.*"]
    : ["./src/entity/*.*"],
  migrations: ["src/migrations/*.*"],
  seeds: ["src/seeds/*.*"],
};
