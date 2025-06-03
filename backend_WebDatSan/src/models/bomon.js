import { sequelize } from "../config/db.js";
import { DataTypes, Sequelize } from "sequelize";

const Bomon = sequelize.define(
  "bomon",
  {
    BoMonID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenBoMon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MoTa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "bomon",
  }
);

export default Bomon;
