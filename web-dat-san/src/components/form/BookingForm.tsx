"use client";
import { useState } from "react";
import styles from "@/styles/form/Form.module.css";
import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/CustomButton";

export default function BookingForm({
  booking,
  onClose,
  onSave,
  type,
}: {
  booking: any;
  onClose: () => void;
  onSave: (booking: any) => void;
  type: string;
}) {
  const [formData, setFormData] = useState({
    NguoiDungID: booking.NguoiDungID,
    LichID: booking.LichID,
    ThoiGianDat: booking.ThoiGianDat,
    TrangThai: booking.TrangThai,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>
          {type === "edit" ? "Sửa" : "Thêm"} đơn đặt đơn đặt
        </h2>
        <div className={styles.form}>
          <label className={styles.label}>Người dùng (ID)</label>
          <CustomInput
            name="NguoiDungID"
            type="number"
            value={formData.NguoiDungID}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Lịch (ID)</label>
          <CustomInput
            name="LichID"
            type="number"
            value={formData.LichID}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Thời gian đặt</label>
          <CustomInput
            name="ThoiGianDat"
            type="datetime-local"
            value={formData.ThoiGianDat}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Trạng thái</label>
          <select
            name="TrangThai"
            value={formData.TrangThai}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="Tam">Tạm</option>
            <option value="XacNhan">Xác nhận</option>
            <option value="Huy">Hủy</option>
          </select>

          <div className={styles.formActions}>
            <CustomButton
              text="Hủy"
              onClick={onClose}
              className={`${styles.actionButton} ${styles.cancelButton}`}
            />
            <CustomButton
              text="Lưu"
              onClick={handleSubmit}
              className={styles.actionButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
