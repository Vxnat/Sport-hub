import express from "express";
import nguoidungController from "../controllers/NguoiDungController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/danh-sach", nguoidungController.layDanhSachNguoiDung);
router.get("/:id", nguoidungController.layNguoiDung);
router.post("/dang-nhap", authenticateToken, nguoidungController.dangnhap);
router.post("/dang-ky", nguoidungController.taoNguoiDung);
router.put("/:id", nguoidungController.capNhatNguoiDung);
router.delete("/:id", nguoidungController.xoaNguoiDung);

export default router;
