import { Routes, Route, Navigate } from 'react-router-dom'
import OtpVerification from './pages/Auth/OtpVerification'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import VerifyEmail from './pages/Auth/VerifyEmail'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
        path="/verify-otp"
        element={<OtpVerification />}
      />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  )
}

export default App