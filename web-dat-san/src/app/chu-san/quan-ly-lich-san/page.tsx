"use client";
import CustomButton from "@/components/ui/CustomButton";
import Pagination from "@/components/pagination/Pagination";
import styles from "@/styles/pages/Owner.module.css";
import { useEffect, useState } from "react";
import ScheduleForm from "@/components/form/ScheduleForm";
import { showConfirm, showError, showSuccess } from "@/utils/CustomAlert";
import { useGetUserEventFields } from "@/lib/api/eventFieldApi";
import { Loading } from "@/utils/Loading";
import {
  useAddEventField,
  useEditEventField,
  useDeleteEventField,
} from "@/lib/api/eventFieldApi";
import useSWR from "swr";

export default function ScheduleManagement() {
  const [formField, setFormField] = useState({
    type: "",
    show: false,
    data: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 7;

  const {
    data: schedules,
    isLoading,
    error,
  } = useSWR(
    [`quan-ly-lich-san`, currentPage],
    () =>
      useGetUserEventFields({
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
    if (schedules) {
      setTotalPages(Math.ceil(schedules.count / itemsPerPage));
    }
  }, [schedules]);

  const handleEdit = (schedule: any) => {
    setFormField({ type: "edit", show: true, data: schedule });
  };
  const handleAdd = () => {
    setFormField({ type: "add", show: true, data: null });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: number) => {
    showConfirm({ title: "Xóa", text: "Bạn có chắc chắn không ?" }).then(
      async (result: any) => {
        if (result.isConfirmed) {
          try {
            await useDeleteEventField({ LichID: id }).then(() => {
              showSuccess({ title: "Xóa", text: `Xóa lịch sân thành công` });
            });
          } catch (error) {
            showError({ title: "Lỗi", text: error });
          }
        }
      }
    );
  };

  const handleClose = () => {
    setFormField({ type: "", show: false, data: null });
  };

  const handleSubmitAdd = (schedule: any) => {
    showConfirm({
      title: "Thêm lịch sân",
      text: "Bạn có chắc chắn không ?",
    }).then(async (result: any) => {
      try {
        if (result.isConfirmed) {
          await useAddEventField({
            ...schedule,
          }).then(() => {
            showSuccess({
              title: "Thành công",
              text: "Thêm lịch thành công",
            });
          });
        }
      } catch (error) {
        showError({ title: "Lỗi", text: error });
      } finally {
        setFormField({ type: "", show: false, data: null });
      }
    });
  };

  const handleSubmitEdit = (schedule: any) => {
    showConfirm({
      title: "Cập nhật lịch sân",
      text: "Bạn có chắc chắn không ?",
    }).then(async (result: any) => {
      try {
        if (result.isConfirmed) {
          await useEditEventField({
            ...schedule,
          }).then(() => {
            showSuccess({
              title: "Thành công",
              text: "Cập nhật lịch thành công",
            });
          });
        }
      } catch (error) {
        showError({ title: "Lỗi", text: error });
      } finally {
        setFormField({ type: "", show: false, data: null });
      }
    });
  };

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Quản lý lịch sân</h2>
      <CustomButton
        text={<i className="ri-add-circle-fill"></i>}
        className={`${styles.actionButton} ${styles.addButton}`}
        onClick={handleAdd}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sân (ID)</th>
            <th>Ngày</th>
            <th>Giờ bắt đầu</th>
            <th>Giờ kết thúc</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {schedules &&
            schedules.rows.map((schedule: any) => (
              <tr key={schedule.LichID}>
                <td>{schedule.LichID}</td>
                <td>{schedule.SanID}</td>
                <td>{schedule.Ngay}</td>
                <td>{schedule.GioBatDau}</td>
                <td>{schedule.GioKetThuc}</td>
                <td>{schedule.TrangThai}</td>
                <td>
                  <CustomButton
                    text={<i className="ri-edit-2-fill"></i>}
                    onClick={() => handleEdit(schedule)}
                    className={styles.actionButton}
                  />
                  <CustomButton
                    text={<i className="ri-delete-bin-5-fill"></i>}
                    onClick={() => handleDelete(schedule.LichID)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                  />
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
      {formField.show && formField.type === "edit" && formField.data && (
        <ScheduleForm
          schedule={formField.data}
          onClose={handleClose}
          onSave={(schedule) => handleSubmitEdit(schedule)}
          type="edit"
        />
      )}
      {formField.show && formField.type === "add" && (
        <ScheduleForm
          schedule={null}
          onClose={handleClose}
          onSave={(schedule) => handleSubmitAdd(schedule)}
          type="add"
        />
      )}
    </div>
  );
}
