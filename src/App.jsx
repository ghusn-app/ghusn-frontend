import { Routes, Route, Navigate } from 'react-router-dom'
import OtpVerification from './pages/Auth/OtpVerification'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import VerifyEmail from './pages/Auth/VerifyEmail'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import DashboardLayout from './layouts/DashboardLayout'
import Scan from './pages/Diagnosis/Scan'
import ImagePreview from './pages/Diagnosis/ImagePreview'
import Processing from './pages/Diagnosis/Processing'
import Result from './pages/Diagnosis/Result'
import History from './pages/History/History'
import ProcessingError from './pages/Diagnosis/ProcessingError'
import Settings from './pages/Settings/Settings'
import Offline from './pages/Offline/Offline'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="scan" element={<Scan />} />
        <Route path="scan/preview" element={<ImagePreview />} />
        <Route path="scan/processing" element={<Processing />} />
        <Route path="scan/result" element={<Result />} />
        <Route path="scan/error" element={<ProcessingError />} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/offline" element={<Offline />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<OtpVerification />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App