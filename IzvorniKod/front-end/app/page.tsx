import { Page as RegisterPage } from "@/components/app-register-page"
import { Page as LoginPage } from "@/components/app-login-page"

export default function HomePage() {
  return <RegisterPage />
}

export function Login() {
  return <LoginPage />
}
