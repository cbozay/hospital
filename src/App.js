import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hastalar from "./pages/Hastalar";
import HastaEkle from "./pages/HastaEkle";
import RandevuEkle from "./pages/RandevuEkle";
import Detaylar from "./pages/Detaylar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hastalar" element={<Hastalar />} />
        <Route path="/hasta-ekle" element={<HastaEkle />} />
        <Route path="/randevu-ekle" element={<RandevuEkle />} />
        <Route path="/detaylar/:hastaDetayId" element={<Detaylar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
