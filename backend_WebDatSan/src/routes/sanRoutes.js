import express from "express";
import sanController from "../controllers/SanController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/danh-sach/:id", sanController.layDanhSachSan);
router.get(
  "/chu-san",
  authenticateToken,
  sanController.layDanhSachSanCuaNguoiDung
);
router.get("/:id", sanController.laySan);
router.post("/tao-san", authenticateToken, sanController.taoSan);
router.put("/:id", authenticateToken, sanController.capNhatSan);
router.delete("/:id", authenticateToken, sanController.xoaSan);

export default router;
