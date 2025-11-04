import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

// Components
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SpotifyCallback from "./pages/SpotifyCallback";
import PlaybackToastContainer from "./components/spotify-player/PlaybackToastContainer";

import { AnimatePresence } from "motion/react";
import { useAtomValue } from "jotai";
import { themeAtom } from "./jotai/atoms/appAtoms";

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
          className={`min-h-screen font-sans relative transition-colors duration-300 ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
          <main className="flexbox-border px-[64px] w-full relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/spotify-callback" element={<SpotifyCallback />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <PlaybackToastContainer />
        </div>
      </Router>
    </AnimatePresence>
  );
}

export default App;
