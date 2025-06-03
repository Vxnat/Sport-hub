import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const San = sequelize.define(
  "san",
  {
    SanID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenSan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ViTri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MoTa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HinhAnh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Gia: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    BoMonID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TrangThai: {
      type: DataTypes.ENUM,
      values: ["DangHoatDong", "TamNgung", "DaDong"],
      defaultValue: "DangHoatDong",
    },
    NguoiDungID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "san",
    timestamps: false,
  }
);

export default San;
