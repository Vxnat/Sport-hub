import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const NguoiDung = sequelize.define(
  "nguoidung",
  {
    NguoiDungID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    HoTen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    MatKhau: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    VaiTro: {
      type: DataTypes.ENUM,
      values: ["admin", "nguoi_thue", "chu_san"],
      allowNull: false,
      defaultValue: "nguoi_thue",
    },
    DienThoai: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NgayTao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "nguoidung",
    timestamps: false,
  }
);

export default NguoiDung;
