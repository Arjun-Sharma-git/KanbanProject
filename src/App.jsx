import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import LoginPage from "./pages/loginPage/loginPage";
import RegisterPage from "./pages/registerPage/registerPage";
import Public from "./components/Public/public";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const item = localStorage.getItem("token");
    if (item) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/Dashboard/task/:taskId" element={<Public />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
