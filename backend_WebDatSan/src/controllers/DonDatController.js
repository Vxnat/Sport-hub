import DonDatService from "../services/DonDatService.js";
import { StatusCodes } from "http-status-codes";

class DonDatController {
  async layDanhSachDonDat(req, res, next) {
    try {
      const dondats = await DonDatService.layDanhSachDonDat();
      res.status(StatusCodes.OK).json(dondats);
    } catch (error) {
      next(error);
    }
  }

  async layDanhSachDonDatChoChuSan(req, res, next) {
    try {
      const dondats = await DonDatService.layDanhSachDonDatChoChuSan(
        req.user.uid,
        req.query
      );
      res.status(StatusCodes.OK).json(dondats);
    } catch (error) {
      next(error);
    }
  }

  async layDonDat(req, res, next) {
    try {
      const dondat = await DonDatService.layDonDat(req.params.id);
      res.status(StatusCodes.OK).json(dondat);
    } catch (error) {
      next(error);
    }
  }

  async taoDonDat(req, res, next) {
    try {
      const dondat = await DonDatService.taoDonDat(req.body);
      res.status(StatusCodes.CREATED).json(dondat);
    } catch (error) {
      next(error);
    }
  }

  async capNhatDonDat(req, res, next) {
    try {
      const dondat = await DonDatService.capNhatDonDat(req.params.id, req.body);
      res.status(StatusCodes.OK).json(dondat);
    } catch (error) {
      next(error);
    }
  }

  async xoaDonDat(req, res, next) {
    try {
      const dondat = await DonDatService.xoaDonDat(req.params.id);
      res.status(StatusCodes.OK).json(dondat);
    } catch (error) {
      next(error);
    }
  }
}

export default new DonDatController();
