import BinhLuan from "../models/binhluan.js";
import CustomError from "../exceptions/CustomError.js";
import { StatusCodes } from "http-status-codes";

class BinhLuanService {
  async layDanhSachBinhLuanTheoSan(sanId) {
    try {
      const binhluan = await BinhLuan.findAll({ where: { SanID: sanId } });
      if (!binhluan)
        throw new CustomError(
          "Không tìm thấy bình luận",
          StatusCodes.BAD_REQUEST
        );
      return binhluan;
    } catch (error) {
      throw error;
    }
  }

  async taoBinhLuan(data) {
    try {
      return await BinhLuan.create(data);
    } catch (error) {
      throw error;
    }
  }

  async capNhatBinhLuan(data) {
    try {
      const binhluan = await BinhLuan.findOne({
        where: { BinhLuanID: data.BinhLuanID },
      });
      if (!binhluan)
        throw new CustomError(
          "Không tìm thấy bình luận",
          StatusCodes.BAD_REQUEST
        );
      return await binhluan.update(data);
    } catch (error) {
      throw error;
    }
  }

  async xoaBinhLuan(id) {
    try {
      const binhluan = await BinhLuan.findOne({ where: { BinhLuanID: id } });
      if (!binhluan)
        throw new CustomError(
          "Không tìm thấy bình luận",
          StatusCodes.BAD_REQUEST
        );
      return await binhluan.destroy();
    } catch (error) {
      throw error;
    }
  }
}
export default new BinhLuanService();
