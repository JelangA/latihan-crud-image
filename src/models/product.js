const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { addListener } = require("nodemon");

const Product = sequelize.define(
  "Product",
  {
    id: {
      field: "id",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      field: "name",
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      field: "image",
      allowNull: false,
      type: DataTypes.STRING,
    },
    url: {
      field: "url",
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      field: "createdAt",
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updatedAt",
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

module.exports = Product;
