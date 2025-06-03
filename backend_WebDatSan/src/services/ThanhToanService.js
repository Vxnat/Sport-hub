import ThanhToan from "../models/thanhtoan.js";
import CustomError from "../exceptions/CustomError.js";
import { StatusCodes } from "http-status-codes";

class ThanhToanService {
  async layDanhSachThanhToan() {
    try {
      return await ThanhToan.findAll();
    } catch (error) {
      throw error;
    }
  }

  async layThanhToan(id) {
    try {
      const thanhtoan = await ThanhToan.findOne({ where: { ThanhToanID: id } });
      if (!thanhtoan)
        throw new CustomError(
          "Không tìm thấy thanh toán",
          StatusCodes.BAD_REQUEST
        );
      return thanhtoan;
    } catch (error) {
      throw error;
    }
  }

  async taoThanhToan(data) {
    try {
      return await ThanhToan.create(data);
    } catch (error) {
      throw error;
    }
  }

  async capNhatThanhToan(id, data) {
    try {
      const thanhtoan = await ThanhToan.findOne({
        where: { ThanhToanID: id },
      });
      if (!thanhtoan)
        throw new CustomError(
          "Không tìm thấy thanh toán",
          StatusCodes.BAD_REQUEST
        );
      return await thanhtoan.update(data);
    } catch (error) {
      throw error;
    }
  }

  async xoaThanhToan(id) {
    try {
      const thanhtoan = await ThanhToan.findOne({ where: { ThanhToanID: id } });
      if (!thanhtoan)
        throw new CustomError(
          "Không tìm thấy thanh toán",
          StatusCodes.BAD_REQUEST
        );
      return await thanhtoan.destroy();
    } catch (error) {
      throw error;
    }
  }
}

export default new ThanhToanService();
