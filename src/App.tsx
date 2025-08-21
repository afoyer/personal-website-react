import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Components
import Navigation from "./components/navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import DaySelector from "./components/DaySelector";

function App() {
  return (
    <Router>
      <div className="app flex flex-col min-h-screen">
        <Navigation />
        <main className="main-content flex-1 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <DaySelector />
        </main>
      </div>
    </Router>
  );
}

export default App;
