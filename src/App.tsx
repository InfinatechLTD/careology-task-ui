import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import GlobalStyles from "./styles/GlobalStyles";
import { ConfigProvider } from "antd";

function App() {
  return (
    <div className="layout">
      <GlobalStyles />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </div>
  );
}

export default App;
