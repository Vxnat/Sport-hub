import express from "express";
import DonDatController from "../controllers/DonDatController.js";
import { authenticateToken } from "../middlewares/auth.js";
const router = express.Router();

router.get("/danh-sach", DonDatController.layDanhSachDonDat);
router.get(
  "/chu-san",
  authenticateToken,
  DonDatController.layDanhSachDonDatChoChuSan
);
router.get("/:id", DonDatController.layDonDat);
router.post("/tao-don-dat", DonDatController.taoDonDat);
router.put("/:id", DonDatController.capNhatDonDat);
router.delete("/:id", DonDatController.xoaDonDat);

export default router;
