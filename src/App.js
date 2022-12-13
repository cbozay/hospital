import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hastalar from "./pages/Hastalar";
import HastaEkle from "./pages/HastaEkle";
import RandevuEkle from "./pages/RandevuEkle";
import Detaylar from "./pages/Detaylar";
import { api } from "./api/api";
import { url } from "./api/url";
import { useDispatch } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";
import RandevuDetay from "./pages/RandevuDetay";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_HASTALAR_START });
    api
      .get(url.hastalar)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_HASTALAR_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FETCH_HASTALAR_FAIL,
          payload: "Hastaları çekerken bir hata oluştu.",
        });
      });

    dispatch({ type: actionTypes.FETCH_RANDEVULAR_START });
    api
      .get(url.randevular)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_RANDEVULAR_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FETCH_RANDEVULAR_FAIL,
          payload: "Randevuları çekerken bir hata oluştu.",
        });
      });

    dispatch({ type: actionTypes.FETCH_ISLEMLER_START });
    api
      .get(url.islemler)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_ISLEMLER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FETCH_ISLEMLER_FAIL,
          payload: "Islemleri çekerken bir hate oluştu.",
        });
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hastalar" element={<Hastalar />} />
        <Route path="/hasta-ekle" element={<HastaEkle />} />
        <Route path="/randevu-ekle" element={<RandevuEkle />} />
        <Route path="/detaylar/:hastaDetayId" element={<Detaylar />} />
        <Route path="/randevu-detay/:randevuId" element={<RandevuDetay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
