import LichSan from "../models/lichsan.js";
import San from "../models/san.js";
import DonDat from "../models/dondat.js";
import CustomError from "../exceptions/CustomError.js";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import DonDatService from "./DonDatService.js";

class LichSanService {
  async layDanhSachLichSan() {
    try {
      return await LichSan.findAll();
    } catch (error) {
      throw error;
    }
  }

  async layDanhSachLichSanTheoSan(sanId, ngay) {
    try {
      return await LichSan.findAll({
        where: { SanID: sanId, Ngay: ngay, TrangThai: "Trong" },
      });
    } catch (error) {
      throw error;
    }
  }

  async layDanhSachLichSanChoChuSan(id, filters) {
    try {
      const limit = Number(filters.limit) || 10;
      const page = Math.max(1, Number(filters.page) || 1);

      const lichsan = await LichSan.findAndCountAll({
        include: [
          {
            model: San,
            attributes: [],
            where: { NguoiDungID: id },
          },
        ],
        raw: true,
        limit,
        offset: (page - 1) * limit,
      });
      return lichsan;
    } catch (error) {
      throw error;
    }
  }

  async layLichSan(id) {
    try {
      const lichsan = await LichSan.findOne({ where: { LichSanID: id } });
      if (!lichsan)
        throw new CustomError("Không tìm thấy lịch", StatusCodes.BAD_REQUEST);
      return lichsan;
    } catch (error) {
      throw error;
    }
  }

  async taoLichSan(data) {
    try {
      await this.kiemTraXungDot(data);
      return await LichSan.create(data);
    } catch (error) {
      throw error;
    }
  }

  async capNhatLichSan(id, data) {
    try {
      const lichsan = await LichSan.findOne({
        where: { LichID: id },
      });
      if (!lichsan)
        throw new CustomError("Không tìm thấy lịch", StatusCodes.BAD_REQUEST);
      if (data.Ngay && data.GioBatDau && data.GioKetThuc) {
        await this.kiemTraXungDot(data);
      }
      return await lichsan.update(data);
    } catch (error) {
      throw error;
    }
  }

  async xoaLichSan(id) {
    try {
      const lichsan = await LichSan.findOne({ where: { LichID: id } });
      if (!lichsan)
        throw new CustomError("Không tìm thấy lịch", StatusCodes.BAD_REQUEST);
      const dondat = await DonDat.findOne({
        where: { LichID: id },
      });
      if (dondat)
        throw new CustomError("Sân đã có lịch đặt", StatusCodes.BAD_REQUEST);
      return await lichsan.destroy();
    } catch (error) {
      throw error;
    }
  }

  async kiemTraXungDot(data) {
    try {
      const isConflict = await LichSan.findOne({
        where: {
          SanID: data.SanID,
          Ngay: data.Ngay,
          [Op.and]: [
            { GioBatDau: { [Op.lt]: data.GioKetThuc } },
            { GioKetThuc: { [Op.gt]: data.GioBatDau } },
          ],
        },
      });

      if (isConflict) {
        throw new CustomError(
          "Khung giờ này đã được đặt",
          StatusCodes.BAD_REQUEST
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async datLichSan(id, data, NguoiDungID) {
    try {
      const lichsan = await LichSan.findOne({ where: { LichID: id } });
      if (!lichsan)
        throw new CustomError("Không tìm thấy lịch", StatusCodes.BAD_REQUEST);
      await DonDatService.taoDonDat({
        LichID: id,
        NguoiDungID,
      });
      return await lichsan.update({
        TrangThai: "DaDat",
        ...data,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new LichSanService();
