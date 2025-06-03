import { Sequelize } from "sequelize";
import "dotenv/config";

// Tạo instance Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
    timezone: "+07:00", // set timezone to Vietnam time
    dialectOptions: {
      connectTimeout: 10000, // Timeout 10 giây
    },
  }
);

// Hàm kiểm tra kết nối
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối database thành công!");
  } catch (error) {
    console.error("Không thể kết nối database:", error);
    process.exit(1); // Thoát nếu lỗi
  }
};

export { connectDB, sequelize };
