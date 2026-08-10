export const DEFAULT_LOGIN_VALUES = {
  email: "",
  password: "",
} as const;

export const LOGIN_MESSAGES = {
  title: "Masuk ke Akun Anda",
  description: "Masukkan email dan password Anda di bawah ini untuk masuk",
  submitText: "Masuk",
  loadingText: "Memproses...",
  genericError: "Gagal masuk. Periksa kembali email dan password Anda.",
  invalidInputError: "Alamat email atau password tidak valid.",
  noAccountText: "Belum punya akun?",
  signUpText: "Daftar",
  forgotPasswordText: "Lupa password?",
} as const;

export const AUTH_ROUTES = {
  home: "/",
  login: "/auth/login",
} as const;
