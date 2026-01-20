import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import PersonsList from "./pages/PersonsList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/persons" element={<PersonsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
