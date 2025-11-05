import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

// Components
import Home from "./pages/Home";
import SpotifyCallback from "./pages/SpotifyCallback";

import { AnimatePresence } from "motion/react";
import { useAtomValue } from "jotai";
import { themeAtom } from "./jotai/atoms/appAtoms";

export const CONTAINER_PADDING = 16;

function App() {
  const theme = useAtomValue(themeAtom);

  // Sync theme with document element for better dark mode support
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <AnimatePresence>
      <Router>
        <div
          className={`h-screen w-screen font-sans relative transition-colors duration-300 overflow-hidden ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
          <main
            className={`flexbox-border px-[${CONTAINER_PADDING}px] w-full h-full relative z-10 overflow-hidden`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/spotify-callback" element={<SpotifyCallback />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AnimatePresence>
  );
}

export default App;
