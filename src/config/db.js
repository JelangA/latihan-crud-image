const Sequelize = require("sequelize");

const config = require("./config.json")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

try {
  sequelize.authenticate();
  console.log("koneksi berhasil");
} catch (error) {
  console.log("unble to connect:", error);
}

module.exports = sequelize;
