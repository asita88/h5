module.exports = {
  port: 4000,
  sequelize: {
    database: "test",
    username: "root",
    password: "123456",
    options: {
      host: 'localhost',
      dialect: 'mysql'
    },
  },
  // sequelize: {
  //   dialect: "sqlite",
  //   storage: "sqliteDb.db",
  // }
  middleware: ["handlerError"],
  jwt: { secret: "huangwei9527" },
  crypto: { secret: "#*#*huangwei9527*#*#" },
  baseUrl: "",
};
