import express from "express";
import boMonController from "../controllers/BoMonController.js";

const router = express.Router();

router.get("/san", boMonController.laySoLuongSanTheoBoMon);

export default router;
