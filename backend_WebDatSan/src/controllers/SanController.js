import SanService from "../services/SanService.js";
import { StatusCodes } from "http-status-codes";
class SanController {
  async layDanhSachSan(req, res, next) {
    try {
      const danhSachSan = await SanService.layDanhSachSan(
        req.params.id,
        req.query
      );
      res.status(StatusCodes.OK).json(danhSachSan);
    } catch (error) {
      next(error);
    }
  }

  async layDanhSachSanCuaNguoiDung(req, res, next) {
    try {
      const danhSachSan = await SanService.layDanhSachSanCuaNguoiDung(
        req.user.uid,
        req.query
      );
      res.status(StatusCodes.OK).json(danhSachSan);
    } catch (error) {
      next(error);
    }
  }

  async laySan(req, res, next) {
    try {
      const san = await SanService.laySan(req.params.id);
      res.status(StatusCodes.OK).json(san);
    } catch (error) {
      next(error);
    }
  }

  async taoSan(req, res, next) {
    try {
      const san = await SanService.taoSan(req.user.uid, req.body);
      res.status(StatusCodes.CREATED).json(san);
    } catch (error) {
      next(error);
    }
  }

  async capNhatSan(req, res, next) {
    try {
      const san = await SanService.capNhatSan(
        req.user.uid,
        req.params.id,
        req.body
      );
      res.status(StatusCodes.OK).json(san);
    } catch (error) {
      next(error);
    }
  }

  async xoaSan(req, res, next) {
    try {
      const san = await SanService.xoaSan(req.user.uid, req.params.id);
      res.status(StatusCodes.OK).json(san);
    } catch (error) {
      next(error);
    }
  }
}

export default new SanController();
