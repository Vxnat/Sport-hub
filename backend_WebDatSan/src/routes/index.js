import nguoidungRoutes from "./nguoidungRoutes.js";
import sanRoutes from "./sanRoutes.js";
import lichsanRoutes from "./lichsanRoutes.js";
import dondatRoutes from "./dondatRoutes.js";
import thanhtoanRoutes from "./thanhtoanRoutes.js";
import binhluanRoutes from "./binhluanRoutes.js";
import bomonRoutes from "./bomonRoutes.js";
function route(app) {
  app.use("/nguoi-dung", nguoidungRoutes);
  app.use("/san", sanRoutes);
  app.use("/lich-san", lichsanRoutes);
  app.use("/don-dat", dondatRoutes);
  app.use("/thanh-toan", thanhtoanRoutes);
  app.use("/binh-luan", binhluanRoutes);
  app.use("/bo-mon", bomonRoutes);
}

export default route;
