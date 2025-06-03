import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const ThanhToan = sequelize.define(
  "thanhtoan",
  {
    ThanhToanID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    DonDatID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PhuongThuc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SoTien: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    TrangThai: {
      type: DataTypes.ENUM,
      values: ["ThanhCong", "ThatBai", "ChoXacNhan"],
      allowNull: false,
    },
    ThoiGianThanhToan: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "thanhtoan",
  }
);

export default ThanhToan;
