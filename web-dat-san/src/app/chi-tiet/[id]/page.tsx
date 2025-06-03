"use client";
// app/field-detail/[id]/page.tsx or pages/field-detail/[id].js
import { use, useEffect, useState } from "react";
import styles from "@/styles/pages/FieldDetail.module.css";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import fieldImage from "@/public/img/field.jpg";
import Image from "next/image";
import { useGetFieldById } from "@/lib/api/fieldApi";
import { formatToVND } from "@/utils/FormatVnd";
import { Loading } from "@/utils/Loading";
import Map from "@/components/map/Map";
import TimeRangePicker from "@/components/ui/TimeRangePicker";
import {
  useCheckEventField,
  useGetEventFieldByFieldId,
  useBookingEventField,
} from "@/lib/api/eventFieldApi";
import { showConfirm, showError, showSuccess } from "@/utils/CustomAlert";
import { formatTime } from "@/utils/FormatTime";

const fakeField = {
  name: "Sân bóng Cửu Long",
  phone: "0917176384",
  address: "Đường Thì Thơm, Ấp Bình Phong, Tân Mỹ Chánh, Mỹ Tho, Tiền Giang",
  image: "/images/field1.jpg",
  description:
    "Sân bóng Cửu Long là một trong những sân bóng đẹp nhất khu vực, với mặt cỏ chất lượng cao, hệ thống đèn chiếu sáng hiện đại, và không gian thoáng đãng. Sân phù hợp cho các trận đấu giao lưu, luyện tập, hoặc tổ chức giải đấu.",
  amenities: [
    "Cỏ nhân tạo chất lượng cao",
    "Phòng thay đồ",
    "Bãi đỗ xe miễn phí",
    "Quán nước",
    "Đèn chiếu sáng",
  ],
  price: "500,000 VNĐ/giờ",
  gallery: ["/images/field1.jpg", "/images/field2.jpg", "/images/field3.jpg"],
};

export default function FieldDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [bookingDate, setBookingDate] = useState("");
  const [startBookingTime, setStartBookingTime] = useState("");
  const [endBookingTime, setEndBookingTime] = useState("");

  const { data: field, isLoading, error } = useGetFieldById(id);

  const {
    data: eventField,
    isLoading: isLoadingEventField,
    error: errorEventField,
  } = useGetEventFieldByFieldId(id, bookingDate);

  const handleCheckBooking = async () => {
    try {
      const response = await useCheckEventField({
        SanID: id,
        Ngay: bookingDate,
        GioBatDau: formatTime(startBookingTime),
        GioKetThuc: formatTime(endBookingTime),
      });
      if (response.status === 200) {
        showConfirm({
          title: "Đặt sân",
          text: "Lịch trống , bạn có muốn đặt không ?",
        }).then(async (result: any) => {
          if (result.isConfirmed) {
            const response = await useBookingEventField({
              SanID: id,
              Ngay: bookingDate,
              GioBatDau: startBookingTime,
              GioKetThuc: endBookingTime,
            });
            if (response.status === 200) {
              showSuccess({ title: "Đặt sân", text: "Đặt sân thành công" });
            }
          }
        });
      }
    } catch (error: any) {
      showError({ title: "Đặt sân", text: error });
    }
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (!value) {
      setStartBookingTime("");
      setEndBookingTime("");
      return;
    }

    try {
      const { GioBatDau, GioKetThuc } = JSON.parse(value);
      setStartBookingTime(GioBatDau);
      setEndBookingTime(GioKetThuc);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image
          src={fieldImage}
          alt={field.TenSan}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>{field.TenSan}</h1>
          <p className={styles.heroSubtitle}>
            <span className={styles.icon}>📍</span> {field.ViTri}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.container}>
        <main className={styles.main}>
          {/* Field Info */}
          <section className={styles.infoSection}>
            <h2 className={styles.sectionTitle}>Thông tin sân</h2>
            <p className={styles.description}>{field.MoTa}</p>
            <div className={styles.infoDetails}>
              <p className={styles.infoItem}>
                <span className={styles.icon}>📞</span>{" "}
                {field.nguoidung.DienThoai}
              </p>
              <p className={styles.infoItem}>
                <span className={styles.icon}>💰</span> {formatToVND(field.Gia)}
              </p>
            </div>
            <h3 className={styles.subTitle}>Tiện ích</h3>
            <ul className={styles.amenities}>
              {fakeField.amenities.map((amenity, index) => (
                <li key={index} className={styles.amenityItem}>
                  <span className={styles.checkIcon}>✔</span> {amenity}
                </li>
              ))}
            </ul>
          </section>

          {/* Map Placeholder */}
          <section className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>Vị trí</h2>
            <div className={styles.mapPlaceholder}>
              {/* <Map address={field.ViTri} /> */}
            </div>
          </section>

          {/* Gallery */}
          <section className={styles.gallerySection}>
            <h2 className={styles.sectionTitle}>Hình ảnh sân</h2>
            <div className={styles.gallery}>
              {/* {JSON.parse(field.HinhAnh).map((image: string, index: number) => (
                <Image
                  key={index}
                  src={image}
                  width={300}
                  height={300}
                  priority
                  alt={`Gallery image ${index + 1}`}
                  className={styles.galleryImage}
                />
              ))} */}
            </div>
          </section>
        </main>

        {/* Booking Sidebar */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Đặt sân</h2>
          <div className={styles.bookingForm}>
            <h2>Ngày:</h2>
            <CustomInput
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className={styles.input}
            />
            <h2>Lịch sân:</h2>
            {isLoadingEventField ? (
              <Loading loading={isLoadingEventField} />
            ) : eventField && eventField.length > 0 ? (
              <select onChange={handleChangeDate}>
                <option value="">-- Chọn lịch sân --</option>
                {eventField.map((event: any, index: number) => (
                  <option
                    key={index}
                    value={JSON.stringify({
                      GioBatDau: event.GioBatDau,
                      GioKetThuc: event.GioKetThuc,
                    })}
                  >
                    {event.GioBatDau} - {event.GioKetThuc}
                  </option>
                ))}
              </select>
            ) : (
              bookingDate && <p>Không có lịch ngày {bookingDate}</p>
            )}
            <CustomButton
              text="Đặt ngay"
              onClick={handleCheckBooking}
              className={styles.bookButton}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
