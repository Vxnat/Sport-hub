import LichSanService from "../services/LichSanService.js";
import { StatusCodes } from "http-status-codes";

class LichSanController {
  async layDanhSachLichSan(req, res, next) {
    try {
      const danhSachLichSan = await LichSanService.layDanhSachLichSan();
      res.status(StatusCodes.OK).json(danhSachLichSan);
    } catch (error) {
      next(error);
    }
  }

  async layDanhSachLichSanTheoSan(req, res, next) {
    try {
      const { id } = req.params;
      const { ngay } = req.query;
      const danhSachLichSan = await LichSanService.layDanhSachLichSanTheoSan(
        id,
        ngay
      );
      res.status(StatusCodes.OK).json(danhSachLichSan);
    } catch (error) {
      next(error);
    }
  }

  async layDanhSachLichSanChoChuSan(req, res, next) {
    try {
      const danhSachLichSan = await LichSanService.layDanhSachLichSanChoChuSan(
        req.user.uid,
        req.query
      );
      res.status(StatusCodes.OK).json(danhSachLichSan);
    } catch (error) {
      next(error);
    }
  }

  async layLichSan(req, res, next) {
    try {
      const lichsan = await LichSanService.layLichSan(req.params.id);
      res.status(StatusCodes.OK).json(lichsan);
    } catch (error) {
      next(error);
    }
  }

  async taoLichSan(req, res, next) {
    try {
      const lichsan = await LichSanService.taoLichSan(req.body);
      res.status(StatusCodes.CREATED).json(lichsan);
    } catch (error) {
      next(error);
    }
  }

  async capNhatLichSan(req, res, next) {
    try {
      const lichsan = await LichSanService.capNhatLichSan(
        req.params.id,
        req.body
      );
      res.status(StatusCodes.OK).json(lichsan);
    } catch (error) {
      next(error);
    }
  }

  async xoaLichSan(req, res, next) {
    try {
      const lichsan = await LichSanService.xoaLichSan(req.params.id);
      res.status(StatusCodes.OK).json(lichsan);
    } catch (error) {
      next(error);
    }
  }

  async kiemTraXungDot(req, res, next) {
    try {
      const lichsan = await LichSanService.kiemTraXungDot(req.body);
      res.status(StatusCodes.OK).json(lichsan);
    } catch (error) {
      next(error);
    }
  }

  async datLichSan(req, res, next) {
    try {
      const lichsan = await LichSanService.datLichSan(
        req.params.id,
        req.body,
        req.user.uid
      );
      res.status(StatusCodes.OK).json(lichsan);
    } catch (error) {
      next(error);
    }
  }
}

export default new LichSanController();
