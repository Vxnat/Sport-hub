"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/styles/partials/Header.module.css";
import logo from "@/public/img/logo.png";
import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { useAuth } from "@/context/AuthContext";

const categories = [
  {
    id: 1,
    name: "Bóng đá",
  },
  {
    id: 2,
    name: "Tennis",
  },
  {
    id: 3,
    name: "Golf",
  },
  {
    id: 4,
    name: "Cầu lông",
  },
  {
    id: 5,
    name: "Bóng bàn",
  },
  {
    id: 6,
    name: "Pickleball",
  },
];

export default function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const { authUser, isAuthenticated, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = () => {
    console.log(authUser);
    console.log("Search for:", searchText);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              src={logo}
              alt="SportHub Logo"
              width={120}
              height={20}
              className={styles.logo}
            />
          </Link>
        </div>

        {/* Navigation and Search/Login */}
        <div className={styles.navAndActions}>
          {/* Navigation */}
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <Link
                  href="/"
                  className={
                    styles.navLink +
                    " " +
                    styles[pathName === "/" ? "active" : ""]
                  }
                >
                  Trang Chủ
                </Link>
              </li>
              <li className={styles.dropdown}>
                <button onClick={toggleDropdown} className={styles.navLink}>
                  Danh Sách Sân Bãi
                  <span className={styles.dropdownArrow}>▼</span>
                </button>
                {isDropdownOpen && (
                  <ul className={styles.dropdownMenu}>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/danh-sach-san-bai/${category.id}`}
                          className={styles.dropdownItem}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link href="/about" className={styles.navLink}>
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link href="/policy" className={styles.navLink}>
                  Chính Sách
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.navLink}>
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </nav>

          {/* Actions (Search and Login) */}
          <div className={styles.actions}>
            <div className={styles.search}>
              <CustomButton
                text={
                  isSearchOpen ? (
                    <i className="ri-close-fill"></i>
                  ) : (
                    <i className="ri-search-2-line"></i>
                  )
                }
                onClick={toggleSearch}
              />
              {isSearchOpen && (
                <div className={styles.searchForm}>
                  <CustomInput
                    type="text"
                    value={searchText}
                    placeholder="Tìm kiếm tên sân..."
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <CustomButton text="Tìm" onClick={handleSearch} />
                </div>
              )}
            </div>
            {isAuthenticated && authUser && authUser.VaiTro === "chu_san" && (
              <Link href="/chu-san/quan-ly-san">
                <CustomButton text={<i className="ri-dashboard-3-line"></i>} />
              </Link>
            )}
            {isAuthenticated ? (
              <CustomButton
                text={<i className="ri-user-line"> {authUser?.HoTen}</i>}
              />
            ) : (
              <Link href="/auth">
                <CustomButton text={<i className="ri-user-line"></i>} />
              </Link>
            )}
            {isAuthenticated && (
              <CustomButton
                text={
                  <i
                    className="ri-logout-box-r-line"
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                  ></i>
                }
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
