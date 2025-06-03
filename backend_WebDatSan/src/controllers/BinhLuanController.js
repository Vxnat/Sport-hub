import BinhLuanService from "../services/BinhLuanService.js";
import { StatusCodes } from "http-status-codes";

class BinhLuanController {
  async layDanhSachBinhLuanTheoSan(req, res, next) {
    try {
      const binhluans = await BinhLuanService.layDanhSachBinhLuanTheoSan(
        req.params.sanId
      );
      res.status(StatusCodes.OK).json(binhluans);
    } catch (error) {
      next(error);
    }
  }

  async taoBinhLuan(req, res, next) {
    try {
      const binhluan = await BinhLuanService.taoBinhLuan(req.body);
      res.status(StatusCodes.CREATED).json(binhluan);
    } catch (error) {
      next(error);
    }
  }

  async capNhatBinhLuan(req, res, next) {
    try {
      const binhluan = await BinhLuanService.capNhatBinhLuan(
        req.params.id,
        req.body
      );
      res.status(StatusCodes.OK).json(binhluan);
    } catch (error) {
      next(error);
    }
  }

  async xoaBinhLuan(req, res, next) {
    try {
      const binhluan = await BinhLuanService.xoaBinhLuan(req.params.id);
      res.status(StatusCodes.OK).json(binhluan);
    } catch (error) {
      next(error);
    }
  }
}

export default new BinhLuanController();
