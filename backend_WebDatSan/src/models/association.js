import NguoiDung from "./nguoidung.js";
import San from "./san.js";
import DonDat from "./dondat.js";
import LichSan from "./lichsan.js";
import BinhLuan from "./binhluan.js";
import ThanhToan from "./thanhtoan.js";
import Bomon from "./bomon.js";

NguoiDung.hasMany(San, { foreignKey: "NguoiDungID" });
San.belongsTo(NguoiDung, { foreignKey: "NguoiDungID" });

NguoiDung.hasMany(DonDat, { foreignKey: "NguoiDungID" });
DonDat.belongsTo(NguoiDung, { foreignKey: "NguoiDungID" });

NguoiDung.hasMany(BinhLuan, { foreignKey: "NguoiDungID" });
BinhLuan.belongsTo(NguoiDung, { foreignKey: "NguoiDungID" });

San.hasMany(BinhLuan, { foreignKey: "SanID" });
BinhLuan.belongsTo(San, { foreignKey: "SanID" });

San.hasMany(LichSan, { foreignKey: "SanID" });
LichSan.belongsTo(San, { foreignKey: "SanID" });

San.belongsTo(Bomon, { foreignKey: "BoMonID" });
Bomon.hasMany(San, { foreignKey: "BoMonID" });

DonDat.hasOne(ThanhToan, { foreignKey: "DonDatID" });
ThanhToan.belongsTo(DonDat, { foreignKey: "DonDatID" });

DonDat.belongsTo(LichSan, { foreignKey: "LichID" });
