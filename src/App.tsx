import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useDispatch } from "react-redux";
import { setToken } from "./features/auth/authSlice";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import GlobalStyles from "./styles/GlobalStyles";
import TasksPage from "./pages/TasksPage";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Rehydrate token from localStorage on app load
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   dispatch(setToken(token));
    // }
    // setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="layout">
      <GlobalStyles />
      <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
        <Router>
          <Routes>
            {/* Protected Routes for authenticated users */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<div>Hello</div>} />
            </Route>

            {/* <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} /> */}
          </Routes>
        </Router>
      </ConfigProvider>
    </div>
  );
}

export default App;
