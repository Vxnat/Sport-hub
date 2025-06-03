import ThanhToanService from "../services/ThanhToanService.js";
import { StatusCodes } from "http-status-codes";

class ThanhToanController {
  async layDanhSachThanhToan(req, res, next) {
    try {
      const thanhtoans = await ThanhToanService.layDanhSachThanhToan();
      res.status(StatusCodes.OK).json(thanhtoans);
    } catch (error) {
      next(error);
    }
  }

  async layThanhToan(req, res, next) {
    try {
      const thanhtoan = await ThanhToanService.layThanhToan(req.params.id);
      res.status(StatusCodes.OK).json(thanhtoan);
    } catch (error) {
      next(error);
    }
  }

  async taoThanhToan(req, res, next) {
    try {
      const thanhtoan = await ThanhToanService.taoThanhToan(req.body);
      res.status(StatusCodes.CREATED).json(thanhtoan);
    } catch (error) {
      next(error);
    }
  }

  async capNhatThanhToan(req, res, next) {
    try {
      const thanhtoan = await ThanhToanService.capNhatThanhToan(
        req.params.id,
        req.body
      );
      res.status(StatusCodes.OK).json(thanhtoan);
    } catch (error) {
      next(error);
    }
  }

  async xoaThanhToan(req, res, next) {
    try {
      const thanhtoan = await ThanhToanService.xoaThanhToan(req.params.id);
      res.status(StatusCodes.OK).json(thanhtoan);
    } catch (error) {
      next(error);
    }
  }
}

export default new ThanhToanController();
