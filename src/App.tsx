import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <div className="layout">
      <GlobalStyles />

      <Router>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
