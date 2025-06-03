import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const BinhLuan = sequelize.define(
  "binhluan",
  {
    BinhLuanID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NguoiDungID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SanID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NoiDung: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ThoiGianBinhLuan: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "binhluan",
  }
);

export default BinhLuan;
