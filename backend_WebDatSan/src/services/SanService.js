import San from "../models/san.js";
import NguoiDung from "../models/nguoidung.js";
import BoMon from "../models/bomon.js";
import CustomError from "../exceptions/CustomError.js";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";

class SanService {
  async layDanhSachSan(bomonId, filters) {
    try {
      const whereConditions = {};
      if (filters.query) {
        whereConditions.TenSan = {
          [Op.like]: `%${filters.query}%`,
        };
      }

      const limit = Number(filters.limit) || 10;
      const page = Math.max(1, Number(filters.page) || 1); // Ensure page starts from 1

      const danhSachSan = await San.findAndCountAll({
        include: [
          {
            model: NguoiDung,
            attributes: ["DienThoai"],
          },
          {
            model: BoMon,
            attributes: ["TenBoMon"],
            where: {
              BoMonID: bomonId,
            },
          },
        ],
        where: whereConditions,
        limit,
        offset: (page - 1) * limit,
      });

      return danhSachSan;
    } catch (error) {
      console.error("Error fetching sports facilities: ", error);
      throw error;
    }
  }

  async layDanhSachSanCuaNguoiDung(id, filters) {
    try {
      const limit = Number(filters.limit) || null;
      const page = Math.max(1, Number(filters.page) || 1); // Ensure page starts from 1

      const danhSachSan = await San.findAndCountAll({
        include: [
          {
            model: BoMon,
            attributes: ["TenBoMon"],
          },
        ],
        where: {
          NguoiDungID: id,
        },

        limit,
        offset: (page - 1) * limit,
      });

      return danhSachSan;
    } catch (error) {
      console.error("Error fetching sports facilities: ", error);
      throw error;
    }
  }
  async laySan(id) {
    try {
      const san = await San.findOne({
        include: [
          {
            model: NguoiDung,
            attributes: ["DienThoai"],
          },
        ],
        where: { SanID: id },
      });
      if (!san)
        throw new CustomError("Không tìm thấy sân", StatusCodes.BAD_REQUEST);
      return san;
    } catch (error) {
      throw error;
    }
  }

  async taoSan(NguoiDungID, data) {
    try {
      const san = await San.findOne({
        where: { TenSan: data.TenSan, NguoiDungID },
      });
      if (san)
        throw new CustomError("Tên sân đã tồn tại", StatusCodes.BAD_REQUEST);
      return await San.create({
        ...data,
        NguoiDungID,
      });
    } catch (error) {
      throw error;
    }
  }
  async capNhatSan(NguoiDungID, id, data) {
    try {
      const san = await San.findOne({ where: { SanID: id, NguoiDungID } });
      if (!san)
        throw new CustomError("Không tìm thấy sân", StatusCodes.BAD_REQUEST);
      return await san.update(data);
    } catch (error) {
      throw error;
    }
  }
  async xoaSan(NguoiDungID, id) {
    try {
      const san = await San.findOne({ where: { SanID: id, NguoiDungID } });
      if (!san)
        throw new CustomError("Không tìm thấy sân", StatusCodes.BAD_REQUEST);
      return await san.destroy();
    } catch (error) {
      throw error;
    }
  }
}

export default new SanService();
