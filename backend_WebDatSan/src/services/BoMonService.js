import Bomon from "../models/bomon.js";
import San from "../models/san.js";
import CustomError from "../exceptions/CustomError.js";
import { StatusCodes } from "http-status-codes";
import { Sequelize } from "sequelize";

class BoMonService {
  async laySoLuongSanTheoBoMon() {
    try {
      return Bomon.findAll({
        include: [{ model: San, attributes: [] }],
        attributes: {
          include: [
            "BoMonID", // Or other Bomon fields you want
            "TenBoMon",
            [Sequelize.fn("COUNT", Sequelize.col("sans.BoMonID")), "soluong"],
          ],
        },
        group: ["bomon.BoMonID", "bomon.TenBoMon"],
        raw: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new BoMonService();
