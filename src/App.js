import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddAppointment from "./pages/AddAppointment";
import Patients from "./pages/Patients";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/randevu-ekle" element={<AddAppointment />} />
          <Route path="/add-patient" element={<Patients />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
