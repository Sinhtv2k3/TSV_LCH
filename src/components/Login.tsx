import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Alert,
  Link,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "error"
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await axiosInstance.post("/login", data); 
      const token = response.data.accessToken;
      if (token) {
        localStorage.setItem("authToken", token); 
        setAlertMessage("Đăng nhập thành công!");
        setAlertSeverity("success");
        setTimeout(() => {
          navigate("/homepage");
        }, 2000);
      } else {
        throw new Error("Không có token trong phản hồi");
      }
    } catch (error: any) {
      if (error.response) {
        console.log("Phản hồi từ máy chủ:", error.response.data);
        const errorMessage = error.response.data.message;
        if (errorMessage === "Email không tồn tại") {
          setAlertMessage("Email chưa được đăng ký!");
        } else if (errorMessage === "Mật khẩu không đúng") {
          setAlertMessage("Mật khẩu không đúng!");
        } else {
          setAlertMessage("Email hoặc mật khẩu không đúng!");
        }
      } else if (error.request) {
        console.log("Không nhận được phản hồi từ máy chủ:", error.request);
        setAlertMessage("Không nhận được phản hồi từ máy chủ.");
      } else {
        console.log("Lỗi:", error.message);
        setAlertMessage("Email hoặc mật khẩu không đúng!");
      }
      setAlertSeverity("error");
    }
  };

  return (
    <Container>
      <Typography variant="h2" textAlign={"center"} mb={2}>
        Đăng nhập
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <TextField
            label="Email"
            {...register("email", {
              required: "Email là bắt buộc",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            })}
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
          />
          <TextField
            label="Mật khẩu"
            {...register("password", {
              required: "Nhập mật khẩu",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
            type="password"
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
          />
          <Button type="submit" variant="contained">
            Gửi
          </Button>
          {alertMessage && (
            <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
              {alertMessage}
            </Alert>
          )}
          <Typography textAlign={"center"} mt={2}>
            Chưa có tài khoản?{" "}
            <Link href="/register" underline="hover">
              Đăng kí ngay
            </Link>
          </Typography>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;
