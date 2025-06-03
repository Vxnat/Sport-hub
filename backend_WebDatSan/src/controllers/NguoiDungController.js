import NguoiDungService from "../services/NguoiDungService.js";
import { StatusCodes } from "http-status-codes";
class NguoiDungController {
  async layDanhSachNguoiDung(req, res, next) {
    try {
      const nguoiDung = await NguoiDungService.layDanhSachNguoiDung();
      res.status(StatusCodes.OK).json(nguoiDung);
    } catch (error) {
      next(error);
    }
  }

  async layNguoiDung(req, res, next) {
    try {
      const nguoiDung = await NguoiDungService.layNguoiDung(req.params.id);
      res.status(StatusCodes.OK).json(nguoiDung);
    } catch (error) {
      next(error);
    }
  }

  async taoNguoiDung(req, res, next) {
    try {
      const nguoiDung = await NguoiDungService.taoNguoiDung(req.body);
      res.status(StatusCodes.CREATED).json(nguoiDung);
    } catch (error) {
      next(error);
    }
  }

  async capNhatNguoiDung(req, res, next) {
    try {
      const nguoiDung = await NguoiDungService.capNhatNguoiDung(
        req.params.id,
        req.body
      );
      res.status(StatusCodes.OK).json(nguoiDung);
    } catch (error) {
      next(error);
    }
  }

  async xoaNguoiDung(req, res, next) {
    try {
      const nguoiDung = await NguoiDungService.xoaNguoiDung(req.params.id);
      res.status(StatusCodes.OK).json(nguoiDung);
    } catch (error) {
      next(error);
    }
  }

  async dangnhap(req, res, next) {
    try {
      const nguoiDung = await NguoiDungService.dangnhap(req.user.uid);
      res.status(StatusCodes.OK).json(nguoiDung);
    } catch (error) {
      next(error);
    }
  }
}

export default new NguoiDungController();
