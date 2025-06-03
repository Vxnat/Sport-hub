import BoMonService from "../services/BoMonService.js";
import { StatusCodes } from "http-status-codes";

class BoMonController {
  async laySoLuongSanTheoBoMon(req, res, next) {
    try {
      const bomon = await BoMonService.laySoLuongSanTheoBoMon();
      res.status(StatusCodes.OK).json(bomon);
    } catch (error) {
      next(error);
    }
  }
}
export default new BoMonController();
