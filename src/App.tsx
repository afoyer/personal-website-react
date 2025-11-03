import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { AnimatePresence } from "motion/react";

function App() {
  return (
    <AnimatePresence>
      <Router>
        <div className="min-h-screen font-sans ">
          <main className="flexbox-border px-[64px] w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AnimatePresence>
  );
}

export default App;
