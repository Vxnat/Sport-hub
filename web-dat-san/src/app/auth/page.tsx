"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/AuthPage.module.css";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import { showError, showSuccess } from "@/utils/CustomAlert";
import { useRegister } from "@/lib/api/authApi";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(loginEmail, loginPassword);
      router.push("/");
    } catch (error: any) {
      showError({ title: "Đăng nhập", text: error.message });
    }
  };

  const handleRegister = async () => {
    if (registerPassword !== registerConfirmPassword) {
      showError({ title: "Đăng ký", text: "Mật khẩu không khớp" });
      return;
    }
    try {
      const response = await useRegister(registerEmail, registerPassword);
      if (response.status === 201) {
        showSuccess({ title: "Đăng ký", text: "Đăng ký thành công" });
        router.push("/auth/login");
      }
    } catch (error: any) {
      showError({ title: "Đăng ký", text: error.message });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${
              activeTab === "login" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Đăng nhập
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "register" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            Đăng ký
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.formContainer}>
          {/* Login Form */}
          {activeTab === "login" && (
            <div className={styles.form}>
              <h2 className={styles.formTitle}>Đăng nhập</h2>
              <CustomInput
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className={styles.input}
              />
              <CustomInput
                type="password"
                placeholder="Mật khẩu"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className={styles.input}
              />
              <CustomButton
                text="Đăng nhập"
                onClick={handleLogin}
                className={styles.submitButton}
              />
              <p className={styles.linkText}>
                Chưa có tài khoản?{" "}
                <span
                  className={styles.link}
                  onClick={() => setActiveTab("register")}
                >
                  Đăng ký ngay
                </span>
              </p>
            </div>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <div className={styles.form}>
              <h2 className={styles.formTitle}>Đăng ký</h2>
              <CustomInput
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className={styles.input}
              />
              <CustomInput
                type="password"
                placeholder="Mật khẩu"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className={styles.input}
              />
              <CustomInput
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                className={styles.input}
              />
              <CustomButton
                text="Đăng ký"
                onClick={handleRegister}
                className={styles.submitButton}
              />
              <p className={styles.linkText}>
                Đã có tài khoản?{" "}
                <span
                  className={styles.link}
                  onClick={() => setActiveTab("login")}
                >
                  Đăng nhập ngay
                </span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
