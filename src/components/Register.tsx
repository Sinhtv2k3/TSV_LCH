import { Button, Container, Stack, TextField, Typography, Alert, Link } from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// React-hook-form
type RegisterForm = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string; // Thêm trường passwordConfirm
};

const Register = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>();

  const password = watch("password");

  // Hàm xử lý khi gửi form
  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      // Kiểm tra xem email đã tồn tại chưa
      const response = await axios.get(`http://localhost:3000/users?email=${data.email}`);
      if (response.data.length > 0) {
        setAlertMessage("Email đã được đăng ký!");
        setAlertSeverity("error");
        return;
      }

      // Nếu email chưa tồn tại, thực hiện đăng ký
      await axios.post("http://localhost:3000/users", data);
      setAlertMessage("Đăng ký thành công!");
      setAlertSeverity("success");
      setTimeout(() => {
        navigate("/login");
      }, 2000); 
    } catch (error) {
      setAlertMessage("Đăng ký thất bại!");
      setAlertSeverity("error");
    }
  };

  return (
    <Container>
      <Typography variant="h2" textAlign={"center"} mb={2}>
        Đăng ký
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <TextField
            label="Tên đăng nhập"
            {...register("username", {
              required: "Tên đăng nhập là bắt buộc",
            })}
            error={!!errors?.username?.message}
            helperText={errors?.username?.message}
          />
          <TextField
            label="Email"
            {...register("email", {
              required: "Email là bắt buộc",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Địa chỉ email không hợp lệ",
              },
            })}
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
          />
          <TextField
            label="Mật khẩu"
            {...register("password", {
              required: "Mật khẩu là bắt buộc",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
            type="password"
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
          />
          <TextField
            label="Xác nhận mật khẩu"
            {...register("passwordConfirm", {
              required: "Xác nhận mật khẩu là bắt buộc",
              validate: (value) =>
                value === password || "Mật khẩu xác nhận không khớp",
            })}
            type="password"
            error={!!errors?.passwordConfirm?.message}
            helperText={errors?.passwordConfirm?.message}
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
            Đã có tài khoản?{" "}
            <Link href="/login" underline="hover">
              Đăng nhập ngay
            </Link>
          </Typography>
        </Stack>
      </form>
    </Container>
  );
};

export default Register;
