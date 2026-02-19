import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import PersonsList from "./pages/PersonsList";
import BusStopScreen from "./pages/BusStopScreen";
import MapView from "./pages/MapView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/persons" element={<PersonsList />} />
        <Route path="/map" element={<MapView />} />
        <Route
        path="/bus/:bus_stop_number"
        element={<BusStopScreen />}
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
