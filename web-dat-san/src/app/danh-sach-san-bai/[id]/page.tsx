"use client";
import { use, useEffect, useState } from "react";
import styles from "@/styles/pages/FieldList.module.css";
import CustomButton from "@/components/ui/CustomButton";
import fieldImg from "@/public/img/field.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Pagination from "@/components/pagination/Pagination";
import { useGetAllFields } from "@/lib/api/fieldApi";
import { useGetCategoryPerField } from "@/lib/api/categoryApi";
import { Loading } from "@/utils/Loading";

// const sports = [
//   { name: "Bóng đá", count: 156 },
//   { name: "Tennis", count: 3 },
//   { name: "Golf", count: 0 },
//   { name: "Cầu lông", count: 16 },
//   { name: "Bóng bàn", count: 1 },
//   { name: "Pickleball", count: 124 },
// ];

export default function FieldListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    data: fields,
    isLoading,
    error,
  } = useGetAllFields({
    id,
    limit: itemsPerPage,
    page: currentPage,
    query: "",
  });

  const { data: sports, isLoading: isLoadingSports } = useGetCategoryPerField();

  useEffect(() => {
    if (fields) {
      setTotalPages(Math.ceil(fields.count / itemsPerPage));
    }
  }, [fields]);

  useEffect(() => {
    console.log(sports);
  }, [sports]);

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Danh sách sân bãi</h2>
          <ul className={styles.sportList}>
            {sports &&
              sports.map((sport: any, index: number) => (
                <Link href={`/danh-sach-san-bai/${sport.BoMonID}`} key={index}>
                  <li key={index} className={styles.sportItem}>
                    <span>{sport.TenBoMon}</span>
                    <span className={styles.count}>{sport.soluong}</span>
                  </li>
                </Link>
              ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          <h2 className={styles.mainTitle}>Danh sách sân bãi</h2>
          <div className={styles.fieldList}>
            {fields &&
              fields.rows.map((field: any, index: number) => (
                <div key={index} className={styles.fieldCard}>
                  <Image
                    src={fieldImg}
                    alt={field.TenSan}
                    className={styles.fieldImage}
                  />
                  <div className={styles.fieldContent}>
                    <h3 className={styles.fieldName}>{field.TenSan}</h3>
                    <p className={styles.fieldInfo}>
                      <span className={styles.icon}>📞</span>{" "}
                      {field.nguoidung.DienThoai}
                    </p>
                    <p className={styles.fieldInfo}>
                      <span className={styles.icon}>📍</span> {field.ViTri}
                    </p>
                    <CustomButton
                      text="Chi tiết"
                      className={styles.detailButton}
                      onClick={() => {
                        router.push(`/chi-tiet/${field.SanID}`);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  );
}
