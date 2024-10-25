import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      html,
      body,
      #root {
        height: 100%;
        margin: 0;
        padding: 0;
      }

      body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
    `}
  />
);

function App() {
  return (
    <div className="layout">
      <GlobalStyles />

      <Router>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
