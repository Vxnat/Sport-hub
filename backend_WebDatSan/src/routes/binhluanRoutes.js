import express from "express";
import binhLuanController from "../controllers/BinhLuanController.js";

const router = express.Router();

router.get("/danh-sach/:sanId", binhLuanController.layDanhSachBinhLuanTheoSan);
router.post("/tao-binh-luan", binhLuanController.taoBinhLuan);
router.put("/:id", binhLuanController.capNhatBinhLuan);
router.delete("/:id", binhLuanController.xoaBinhLuan);

export default router;
