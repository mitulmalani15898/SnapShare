import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Account } from "./components/Account";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/Dashboard";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Account>
        <BrowserRouter>
          {/* <NavbarComponent /> */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </Account>
    </div>
  );
};

export default App;
