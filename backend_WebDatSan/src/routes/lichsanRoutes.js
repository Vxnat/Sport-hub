import express from "express";
import LichSanController from "../controllers/LichSanController.js";
import { authenticateToken } from "../middlewares/auth.js";
const router = express.Router();

router.get(
  "/danh-sach",
  authenticateToken,
  LichSanController.layDanhSachLichSan
);
router.get("/san/:id", LichSanController.layDanhSachLichSanTheoSan);
router.get(
  "/chu-san",
  authenticateToken,
  LichSanController.layDanhSachLichSanChoChuSan
);
router.get("/:id", LichSanController.layLichSan);
router.post("/kiem-tra", LichSanController.kiemTraXungDot);
router.post("/dat-lich/:id", authenticateToken, LichSanController.datLichSan);
router.post("/tao-lich-san", authenticateToken, LichSanController.taoLichSan);
router.put("/:id", authenticateToken, LichSanController.capNhatLichSan);
router.delete("/:id", authenticateToken, LichSanController.xoaLichSan);

export default router;
