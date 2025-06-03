"use client";
import { useState } from "react";

import styles from "@/styles/form/Form.module.css";
import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/CustomButton";

export default function FieldForm({
  field,
  onClose,
  onSave,
  type,
}: {
  field: any;
  onClose: () => void;
  onSave: (field: any) => void;
  type: string;
}) {
  const [formData, setFormData] = useState({
    SanID: type === "edit" ? field.SanID : "",
    TenSan: type === "edit" ? field.TenSan : "",
    ViTri: type === "edit" ? field.ViTri : "",
    MoTa: type === "edit" ? field.MoTa : "",
    Gia: type === "edit" ? field.Gia : "",
    BoMonID: type === "edit" ? field.BoMonID : "",
    TrangThai: type === "edit" ? field.TrangThai : "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Chỉnh sửa sân</h2>
        <div className={styles.form}>
          <label className={styles.label}>Tên sân</label>
          <CustomInput
            name="TenSan"
            value={formData.TenSan}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Vị trí</label>
          <CustomInput
            name="ViTri"
            value={formData.ViTri}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Mô tả</label>
          <textarea
            name="MoTa"
            value={formData.MoTa}
            onChange={handleChange}
            className={styles.textarea}
          />

          <label className={styles.label}>Giá</label>
          <CustomInput
            name="Gia"
            value={formData.Gia}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Bộ môn</label>
          <select
            name="BoMonID"
            value={formData.BoMonID}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="" disabled>
              -- Chọn bộ môn --
            </option>
            <option value="1">Bóng đá</option>
            <option value="2">Bóng rổ</option>
            <option value="3">Bóng chuyền</option>
            <option value="4">Cầu lông</option>
            <option value="5">Tennis</option>
            <option value="6">Bơi lội</option>
            <option value="7">Bóng bàn</option>
            <option value="8">Chạy bộ</option>
            <option value="9">Võ thuật</option>
            <option value="10">Gym</option>
          </select>

          {type === "edit" && (
            <>
              <label className={styles.label}>Trạng thái</label>
              <select
                name="TrangThai"
                value={formData.TrangThai}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="DangHoatDong">Đang hoạt động</option>
                <option value="TamNgung">Tạm ngừng</option>
                <option value="DaDong">Đã đóng</option>
              </select>
            </>
          )}

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
