import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useDispatch } from "react-redux";
import { setToken } from "./features/auth/authSlice";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Track loading state

  // Rehydrate token from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
    setLoading(false); // Mark the loading state as complete
  }, [dispatch]);

  // If loading, show a spinner or a loading screen
  if (loading) {
    return <div>Loading...</div>; // Replace this with your loading indicator
  }

  return (
    <div className="layout">
      <GlobalStyles />
      <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
        <Router>
          <Routes>
            {/* Protected Routes for authenticated users */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </div>
  );
}

export default App;
