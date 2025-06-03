import DonDat from "../models/dondat.js";
import NguoiDung from "../models/nguoidung.js";
import LichSan from "../models/lichsan.js";
import San from "../models/san.js";
import { StatusCodes } from "http-status-codes";
import CustomError from "../exceptions/CustomError.js";

class DonDatService {
  async layDanhSachDonDat() {
    try {
      return await DonDat.findAll();
    } catch (error) {
      throw error;
    }
  }

  async layDanhSachDonDatChoChuSan(NguoiDungID, filters) {
    try {
      const limit = Number(filters.limit) || 10;
      const page = Math.max(1, Number(filters.page) || 1);

      const dondat = await DonDat.findAndCountAll({
        include: [
          {
            model: NguoiDung,
            attributes: ["HoTen"],
            required: true,
          },
          {
            model: LichSan,
            attributes: [],
            required: true,
            include: [
              {
                model: San,
                attributes: ["TenSan"],
                required: true,
                where: { NguoiDungID },
              },
            ],
          },
        ],
        subQuery: false,
        limit,
        offset: (page - 1) * limit,
        raw: true,
      });

      return dondat;
    } catch (error) {
      throw error;
    }
  }

  async layDonDat(id) {
    try {
      const dondat = await DonDat.findOne({ where: { DonDatID: id } });
      if (!dondat)
        throw new CustomError(
          "Không tìm thấy đơn đặt",
          StatusCodes.BAD_REQUEST
        );
      return dondat;
    } catch (error) {
      throw error;
    }
  }

  async taoDonDat(data) {
    try {
      return await DonDat.create(data);
    } catch (error) {
      throw error;
    }
  }

  async capNhatDonDat(id, data) {
    try {
      const dondat = await DonDat.findOne({
        where: { DonDatID: id },
      });
      if (!dondat)
        throw new CustomError(
          "Không tìm thấy đơn đặt",
          StatusCodes.BAD_REQUEST
        );
      return await dondat.update(data);
    } catch (error) {
      throw error;
    }
  }

  async xoaDonDat(id) {
    try {
      const dondat = await DonDat.findOne({ where: { DonDatID: id } });
      if (!dondat)
        throw new CustomError(
          "Không tìm thấy đơn đặt",
          StatusCodes.BAD_REQUEST
        );
      return await dondat.destroy();
    } catch (error) {
      throw error;
    }
  }
}

export default new DonDatService();
