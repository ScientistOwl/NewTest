import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Achievement from "./pages/Achievement";
import Footer from "./components/Footer";
import PasswordGate from "./components/PasswordGate";

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/achievement/:id" element={<Achievement />} />
      </Routes>
      {isHomePage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
