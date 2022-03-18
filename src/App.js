import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";

import "./App.css";
import Navbar from "./components/Navbar";
import Pricing from "./components/Subscription";
import { isLoggedIn } from "./utility/common";
import Copyright from "./components/Copyright";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyDocs from "./components/MyDocs";
import SharedDocs from "./components/SharedDocs";

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace={true} />;
};

const PublicRoute = ({ children }) => {
  return isLoggedIn() ? <Navigate to="/" replace={true} /> : children;
};

const PrivateWrapper = ({ children }) => (
  <PrivateRoute>
    <Navbar />
    <Container
      component="main"
      sx={{
        height: "calc(100vh - 117px)",
        paddingY: 3,
        maxHeight: "calc(100vh - 117px)",
        overflow: "auto",
      }}
    >
      {children}
    </Container>
    <Copyright sx={{ my: 2 }} />
  </PrivateRoute>
);

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateWrapper>
                <Dashboard />
              </PrivateWrapper>
            }
          />
          <Route
            exact
            path="/myDocs"
            element={
              <PrivateWrapper>
                <MyDocs />
              </PrivateWrapper>
            }
          />
          <Route
            exact
            path="/sharedDocs"
            element={
              <PrivateWrapper>
                <SharedDocs />
              </PrivateWrapper>
            }
          />
          <Route
            exact
            path="/subscription"
            element={
              <PrivateWrapper>
                <Pricing />
              </PrivateWrapper>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <PrivateWrapper>
                <Dashboard />
              </PrivateWrapper>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route path="*" element={<div>Page Not Found!</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
