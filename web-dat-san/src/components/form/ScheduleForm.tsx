"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/form/Form.module.css";
import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/CustomButton";
import { getChangedFields } from "@/utils/ChangeFormData";
import useSWR from "swr";
import { useGetUserFields } from "@/lib/api/fieldApi";

export default function ScheduleForm({
  schedule,
  onClose,
  onSave,
  type,
}: {
  schedule: any;
  onClose: () => void;
  onSave: (schedule: any) => void;
  type: string;
}) {
  const oldFormData = { ...schedule };
  const [formData, setFormData] = useState({
    LichID: type === "edit" ? schedule.LichID : "",
    SanID: type === "edit" ? schedule.SanID : "",
    Ngay: type === "edit" ? schedule.Ngay : "",
    GioBatDau: type === "edit" ? schedule.GioBatDau : "",
    GioKetThuc: type === "edit" ? schedule.GioKetThuc : "",
    TrangThai: type === "edit" ? schedule.TrangThai : "",
  });
  const { data: fields } = useSWR(
    ["danh-sach-san"],
    () => useGetUserFields({}),
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
    }
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (type === "add") {
      onSave(formData);
    } else {
      const newFormData = {
        ...getChangedFields(oldFormData, formData),
        LichID: schedule.LichID,
      };
      onSave(newFormData);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>
          {type === "add" ? "Thêm" : "Chỉnh sửa"} lịch sân
        </h2>
        <div className={styles.form}>
          <label className={styles.label}>Sân (ID)</label>
          {
            <select
              name="SanID"
              value={formData.SanID}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">-- Chọn sân --</option>
              {fields &&
                fields?.rows.map((field: any) => (
                  <option key={field.SanID} value={field.SanID}>
                    {field.TenSan}
                  </option>
                ))}
            </select>
          }
          <label className={styles.label}>Ngày</label>
          <CustomInput
            name="Ngay"
            type="date"
            value={formData.Ngay}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Giờ bắt đầu</label>
          <CustomInput
            name="GioBatDau"
            type="time"
            value={formData.GioBatDau}
            onChange={handleChange}
            className={styles.input}
          />

          <label className={styles.label}>Giờ kết thúc</label>
          <CustomInput
            name="GioKetThuc"
            type="time"
            value={formData.GioKetThuc}
            onChange={handleChange}
            className={styles.input}
          />

          {type === "edit" && (
            <>
              <label className={styles.label}>Trạng thái</label>
              <select
                name="TrangThai"
                value={formData.TrangThai}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="Trong">Trống</option>
                <option value="DaDat">Đã đặt</option>
                <option value="KhongHoatDong">Không hoạt động</option>
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
