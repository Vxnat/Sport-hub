"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/pages/Owner.module.css";

export default function OwnerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [activeMenu, setActiveMenu] = useState("fields");

  const menuItems = [
    { id: "fields", label: "Quản lý sân", href: "/chu-san/quan-ly-san" },
    {
      id: "schedules",
      label: "Quản lý lịch sân",
      href: "/chu-san/quan-ly-lich-san",
    },
    {
      id: "bookings",
      label: "Quản lý đơn đặt",
      href: "/chu-san/quan-ly-don-dat",
    },
  ];

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>SportHub - Chủ sân</h2>
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`${styles.menuItem} ${
                  activeMenu === item.id ? styles.active : ""
                }`}
                onClick={() => setActiveMenu(item.id)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
