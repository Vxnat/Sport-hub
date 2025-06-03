"use client";
import CustomButton from "@/components/ui/CustomButton";
import Pagination from "@/components/pagination/Pagination";
import styles from "@/styles/pages/Owner.module.css";
import { use, useEffect, useState } from "react";
import FieldForm from "@/components/form/FieldForm";
import { showConfirm, showError, showSuccess } from "@/utils/CustomAlert";
import {
  useGetUserFields,
  useAddField,
  useEditField,
  useDeleteField,
} from "@/lib/api/fieldApi";
import { Loading } from "@/utils/Loading";
import useSWR from "swr";

export default function FieldManagement() {
  const [formField, setFormField] = useState({
    type: "",
    show: false,
    data: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 7;
  const {
    data: fields,
    isLoading,
    error,
  } = useSWR(
    [`quan-ly-san`, currentPage],
    () =>
      useGetUserFields({
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
    if (fields) {
      setTotalPages(Math.ceil(fields.count / itemsPerPage));
    }
  }, [fields]);

  const handleEdit = (field: any) => {
    setFormField({ type: "edit", show: true, data: field });
  };
  const handleAdd = () => {
    setFormField({ type: "add", show: true, data: null });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmitAdd = async (field: any) => {
    showConfirm({ title: "Thêm", text: "Bạn có chắc chắn không ?" }).then(
      async (result: any) => {
        try {
          if (result.isConfirmed) {
            console.log(field);

            await useAddField({
              ...field,
            }).then(() => {
              showSuccess({ title: "Thêm sân", text: "Thêm sân thành công" });
            });
          }
        } catch (error) {
          showError({ title: "Lỗi", text: error });
        } finally {
          setFormField({ type: "", show: false, data: null });
        }
      }
    );
  };

  const handleSubmitEdit = (field: any) => {
    showConfirm({ title: "Cập nhật", text: "Bạn có chắc chắn không ?" }).then(
      async (result: any) => {
        try {
          if (result.isConfirmed) {
            await useEditField({
              ...field,
            }).then(() => {
              showSuccess({
                title: "Cập nhật sân",
                text: "Cập nhật sân thành công",
              });
            });
          }
        } catch (error) {
          showError({ title: "Lỗi", text: error });
        } finally {
          setFormField({ type: "", show: false, data: null });
        }
      }
    );
  };

  const handleClose = () => {
    setFormField({ type: "", show: false, data: null });
  };

  const handleDelete = (id: number) => {
    showConfirm({ title: "Xóa", text: "Bạn có chắc chắn không ?" }).then(
      async (result: any) => {
        if (result.isConfirmed) {
          try {
            await useDeleteField({ SanID: id }).then(() => {
              showSuccess({ title: "Xóa", text: `Xóa thành công sân` });
            });
          } catch (error) {
            showError({ title: "Lỗi", text: error });
          }
        }
      }
    );
  };

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Quản lý sân</h2>
      <CustomButton
        text={<i className="ri-add-circle-fill"></i>}
        className={`${styles.actionButton} ${styles.addButton}`}
        onClick={handleAdd}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sân</th>
            <th>Vị trí</th>
            <th>Mô tả</th>
            <th>Bộ môn</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {fields &&
            fields.rows.map((field: any) => (
              <tr key={field.SanID}>
                <td>{field.SanID}</td>
                <td>{field.TenSan}</td>
                <td>{field.ViTri}</td>
                <td>{field.MoTa}</td>
                <td>{field?.bomon?.TenBoMon}</td>
                <td>{field.TrangThai}</td>
                <td>
                  <CustomButton
                    text={<i className="ri-edit-2-fill"></i>}
                    onClick={() => handleEdit(field)}
                    className={styles.actionButton}
                  />
                  <CustomButton
                    text={<i className="ri-delete-bin-5-fill"></i>}
                    onClick={() => handleDelete(field.SanID)}
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
      {formField.show && formField.type === "edit" && (
        <FieldForm
          field={formField.data}
          onClose={handleClose}
          onSave={(field) => handleSubmitEdit(field)}
          type="edit"
        />
      )}
      {formField.show && formField.type === "add" && (
        <FieldForm
          field={null}
          onClose={handleClose}
          onSave={(field) => handleSubmitAdd(field)}
          type="add"
        />
      )}
    </div>
  );
}
