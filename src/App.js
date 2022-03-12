import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <NavbarComponent /> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
