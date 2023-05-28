module.exports = {
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: process.env.production
    ? ["./dist/entity/*.*"]
    : ["./src/entity/*.*"],
  migrations: process.env.production
    ? ["./dist/migrations/*.*"]
    : ["src/migrations/*.*"],
  seeds: process.env.production ? ["src/seeds/*.*"] : ["src/seeds/*.*"],
};
