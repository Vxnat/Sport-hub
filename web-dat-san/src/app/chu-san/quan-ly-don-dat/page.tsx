"use client";
import CustomButton from "@/components/ui/CustomButton";
import Pagination from "@/components/pagination/Pagination";
import styles from "@/styles/pages/Owner.module.css";
import { useEffect, useState } from "react";
import BookingForm from "@/components/form/BookingForm";
import { showConfirm, showSuccess } from "@/utils/CustomAlert";
import { useGetUserBookings } from "@/lib/api/bookingApi";
import { Loading } from "@/utils/Loading";
import { formatTime } from "@/utils/FormatTime";
import useSWR from "swr";

const bookings = [
  {
    DonDatID: 1,
    NguoiDungID: 1,
    LichID: 2,
    ThoiGianDat: "2025-04-26 11:01:36",
    TrangThai: "XacNhan",
  },
  {
    DonDatID: 2,
    NguoiDungID: 1,
    LichID: 3,
    ThoiGianDat: "2025-04-26 11:01:36",
    TrangThai: "Tam",
  },
];

export default function BookingManagement() {
  const [formField, setFormField] = useState({
    type: "",
    show: false,
    data: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Example: 5 pages for pagination
  const itemsPerPage = 2;
  const {
    data: bookings,
    isLoading,
    error,
  } = useSWR(
    [`quan-ly-don-dat`, currentPage],
    () =>
      useGetUserBookings({
        page: currentPage,
        limit: itemsPerPage,
      }),
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    if (bookings) {
      setTotalPages(Math.ceil(bookings.count / itemsPerPage));
    }
    console.log(bookings);
  }, [bookings]);

  const handleEdit = (booking: any) => {
    setFormField({ type: "edit", show: true, data: booking });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: number) => {
    showConfirm({ title: "Xóa", text: "Bạn có chắc chắn không ?" }).then(
      (result: any) => {
        if (result.isConfirmed) {
          showSuccess({ title: "Xóa", text: `Xóa thành công ${id}` });
        }
      }
    );
  };

  const handleSave = (booking: any) => {
    console.log(booking);
  };

  const handleClose = () => {
    setFormField({ type: "", show: false, data: null });
  };

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Quản lý đơn đặt</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Lịch (ID)</th>
            <th>Sân</th>
            <th>Thời gian đặt</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.rows.map((booking: any) => (
              <tr key={booking.DonDatID}>
                <td>{booking.DonDatID}</td>
                <td>{booking?.["nguoidung.HoTen"]}</td>
                <td>{booking.LichID}</td>
                <td>{booking?.["lichsan.san.TenSan"]}</td>
                <td>{formatTime(booking.ThoiGianDat)}</td>
                <td>{booking.TrangThai}</td>
                <td>
                  {/* <CustomButton
                    text={<i className="ri-edit-2-fill"></i>}
                    onClick={() => handleEdit(booking)}
                    className={styles.actionButton}
                  />
                  <CustomButton
                    text={<i className="ri-delete-bin-5-fill"></i>}
                    onClick={() => handleDelete(booking.DonDatID)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                  /> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      {/* {formField.show && formField.type === "edit" && (
        <BookingForm
          booking={formField.data}
          onClose={handleClose}
          onSave={(booking) => handleSave(booking)}
          type="edit"
        />
      )} */}
    </div>
  );
}
