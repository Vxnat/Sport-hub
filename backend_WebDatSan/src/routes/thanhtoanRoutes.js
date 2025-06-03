import express from "express";
import thanhtoanController from "../controllers/ThanhToanController.js";

const router = express.Router();

router.get("/danh-sach", thanhtoanController.layDanhSachThanhToan);
router.get("/:id", thanhtoanController.layThanhToan);
router.post("/tao-thanh-toan", thanhtoanController.taoThanhToan);
router.put("/:id", thanhtoanController.capNhatThanhToan);
router.delete("/:id", thanhtoanController.xoaThanhToan);

export default router;
