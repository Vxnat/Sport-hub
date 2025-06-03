import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const LichSan = sequelize.define(
  "lichsan",
  {
    LichID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    SanID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Ngay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    GioBatDau: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    GioKetThuc: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    TrangThai: {
      type: DataTypes.ENUM,
      values: ["Trong", "DatDat", "KhongHoatDong"],
      allowNull: false,
      defaultValue: "Trong",
    },
  },
  {
    timestamps: false,
    tableName: "lichsan",
  }
);

export default LichSan;
