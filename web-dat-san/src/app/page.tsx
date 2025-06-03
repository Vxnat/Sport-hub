"use client";
// app/page.tsx or pages/index.js
import { useState } from "react";
import styles from "@/styles/pages/HomePage.module.css";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import banner from "@/public/img/banner.jpg";

export default function HomePage() {
  const [sport, setSport] = useState("Bóng đá");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");

  const handleSearch = () => {
    // alert(`Searching for ${sport} in ${location}, area: ${area}`);
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${banner.src})` }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            HỆ THỐNG HỖ TRỢ TÌM KIẾM SÂN BÃI NHANH
          </h1>
          <p className={styles.heroSubtitle}>
            Dữ liệu được SportHub cập nhật thường xuyên -
            <span className={styles.highlight}>
              {" "}
              Người dùng tìm được sân một cách nhanh nhất
            </span>
          </p>
          {/* Search Bar */}
          <div className={styles.searchBar}>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className={styles.select}
            >
              <option value="Bóng đá">Bóng đá</option>
              <option value="Cầu lông">Cầu lông</option>
              <option value="Bóng rổ">Bóng rổ</option>
            </select>
            <CustomInput
              placeholder="Nhập tên sân"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
            />
            <CustomInput
              placeholder="Nhập khu vực"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={styles.input}
            />
            <CustomButton
              text="Tìm kiếm"
              onClick={handleSearch}
              className={styles.searchButton}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featureItem}>
          <div className={styles.icon}>⚽</div>
          <h3 className={styles.featureTitle}>Tìm kiếm vị trí sân</h3>
          <p className={styles.featureText}>
            Dữ liệu sân bóng đá, cầu lông, bóng bàn, bóng chuyền để tìm kiếm
            theo khu vực mục
          </p>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.icon}>📅</div>
          <h3 className={styles.featureTitle}>Đặt lịch online</h3>
          <p className={styles.featureText}>
            Không cần trực tiếp, không cần gọi điện đặt lịch, bạn hoàn toàn có
            thể đặt sân bóng đá online với internet
          </p>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.icon}>🏃</div>
          <h3 className={styles.featureTitle}>Tìm đội, bắt cập đấu</h3>
          <p className={styles.featureText}>
            Tìm kiếm, giao lưu các đội thi đấu thể thao, kết nối, xây dựng cộng
            đồng bóng thể thao sôi động, mạnh mẽ
          </p>
        </div>
      </section>
    </div>
  );
}
