import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const DonDat = sequelize.define(
  "dondat",
  {
    DonDatID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NguoiDungID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LichID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ThoiGianDat: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    TrangThai: {
      type: DataTypes.ENUM,
      values: ["Tam", "XacNhan", "Huy"],
      allowNull: false,
      defaultValue: "Tam",
    },
  },
  {
    timestamps: false,
    tableName: "dondat",
  }
);

export default DonDat;
