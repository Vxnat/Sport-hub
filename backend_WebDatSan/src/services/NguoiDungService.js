import NguoiDung from "../models/nguoidung.js";
import CustomError from "../exceptions/CustomError.js";
import { StatusCodes } from "http-status-codes";
import { auth } from "../config/firebase.js";
class NguoiDungService {
  async layDanhSachNguoiDung() {
    try {
      return await NguoiDung.findAll();
    } catch (error) {
      throw error;
    }
  }

  async layNguoiDung(NguoiDungID) {
    try {
      const nguoiDung = await NguoiDung.findOne({ where: { NguoiDungID } });
      if (!nguoiDung)
        throw new CustomError(
          "Người dùng không tồn tại",
          StatusCodes.BAD_REQUEST
        );
      return nguoiDung;
    } catch (error) {
      throw error;
    }
  }

  async taoNguoiDung(data) {
    try {
      const nguoiDung = await NguoiDung.findOne({
        where: { Email: data.Email },
      });
      if (nguoiDung)
        throw new CustomError("Email đã tồn tại", StatusCodes.BAD_REQUEST);

      const userRecord = await auth.createUser({
        email: data.Email,
        password: data.MatKhau,
      });

      return await NguoiDung.create({
        NguoiDungID: userRecord.uid,
        HoTen: data.Email.split("@")[0],
        Email: data.Email,
        MatKhau: data.MatKhau,
      });
    } catch (error) {
      throw error;
    }
  }

  async capNhatNguoiDung(id, data) {
    try {
      const nguoiDung = await NguoiDung.findOne({
        where: { NguoiDungID: id },
      });
      if (!nguoiDung)
        throw new CustomError(
          "Người dùng không tồn tại",
          StatusCodes.BAD_REQUEST
        );
      return await nguoiDung.update(data);
    } catch (error) {
      throw error;
    }
  }

  async xoaNguoiDung(id) {
    try {
      const nguoiDung = await NguoiDung.findOne({
        where: { NguoiDungID: id },
      });
      if (!nguoiDung)
        throw new CustomError(
          "Người dùng không tồn tại",
          StatusCodes.BAD_REQUEST
        );
      return await nguoiDung.destroy();
    } catch (error) {
      throw error;
    }
  }

  async dangnhap(NguoiDungID) {
    try {
      const nguoiDung = await NguoiDung.findOne({
        where: { NguoiDungID },
      });
      if (!nguoiDung)
        throw new CustomError(
          "Thông tin tài khoản không chính xác",
          StatusCodes.BAD_REQUEST
        );
      return nguoiDung;
    } catch (error) {
      throw error;
    }
  }
}

export default new NguoiDungService();
