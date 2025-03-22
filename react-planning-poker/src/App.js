import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlanningPokerPage from "./pages/PlanningPokerPage"; // Import your specific page component
import HomePage from "./pages/HomePage"; // Import your homepage component
import CreateGamePage from "./pages/CreateGamePage";
import Background from "./components/Background/Background";

export default function App() {
  return (
    <Background>
      <Router>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<HomePage />} /> {/* Homepage route */}
          <Route path="/planning-poker" element={<PlanningPokerPage />} />{" "}
          <Route path="/create-game" element={<CreateGamePage />} />{" "}
        </Routes>
      </Router>
    </Background>
  );
}
