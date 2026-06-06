import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/features/auth/LoginPage";
import SignupPage from "@/features/auth/SignupPage";
import Dashboard from "@/pages/Dashboard";
import Meetings from "@/pages/Meetings";
import CreateMeeting from "@/pages/CreateMeeting";
import Settings from "@/pages/Settings";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "@/pages/Profile";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

      
        <Route path="/meetings"  element={<Meetings />} />
        <Route path="/create-meeting" element={<CreateMeeting />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
/>
<Route path="/profile" element={ <ProtectedRoute> <Profile />  </ProtectedRoute> }
/>
       
        
       
      </Routes>
    </BrowserRouter>
    
  );
}