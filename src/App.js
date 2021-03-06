import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";

import "./App.css";
import Navbar from "./components/Navbar";
import Subscription from "./components/Subscription";
import { isLoggedIn } from "./utility/common";
import Copyright from "./components/Copyright";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyDocs from "./components/MyDocs";
import SharedDocs from "./components/SharedDocs";
import Profile from "./components/Profile";
import ImageToPdf from "./components/ImageToPdf";

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
            path="/image2pdf"
            element={
              <PrivateWrapper>
                <ImageToPdf />
              </PrivateWrapper>
            }
          />
          <Route
            exact
            path="/subscription"
            element={
              <PrivateWrapper>
                <Subscription />
              </PrivateWrapper>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <PrivateWrapper>
                <Profile />
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
          <Route
            path="*"
            element={
              <Container
                component="main"
                sx={{
                  width: "100vw",
                  margin: "40px auto",
                  fontSize: "30px",
                  textAlign: "center",
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                404, Page Not Found!
              </Container>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
