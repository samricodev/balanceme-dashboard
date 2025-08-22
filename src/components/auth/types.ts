// Types
interface FormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface AuthResponse {
  message?: string;
  token?: string;
  user?: unknown;
}

export type {
  FormData,
  FormErrors,
  AuthResponse
}