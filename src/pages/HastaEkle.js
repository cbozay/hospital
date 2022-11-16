import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Header from "../components/Header";

import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { url } from "../api/url";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

const HastaEkle = (props) => {
  const navigate = useNavigate();
  const { hastalarState } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [sikayet, setSikayet] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "" || surname === "" || phone === "" || sikayet === "") {
      alert("Bütün alanları doldurmak zorunludur!");
      return;
    }
    if (phone.length !== 11) {
      alert("Telefon numarası 11 haneli olmalıdır!");
      return;
    }
    const hasNumber = hastalarState.hastalar.find(
      (hasta) => hasta.phone === phone
    );

    if (hasNumber !== undefined) {
      alert("Bu numarayla kayıtlı bir hasta zaten vardır!");
      return;
    }

    const newIslem = {
      id: String(new Date().getTime() + 1),
      sikayet: sikayet,
      uygulananTedavi: "",
      yazilanIlaclar: [],
    };
    api
      .post(url.islemler, newIslem)
      .then((islemRes) => {
        dispatch({ type: actionTypes.ADD_ISLEM, payload: newIslem });
        const newHasta = {
          id: String(new Date().getTime()),
          name: name,
          surname: surname,
          phone: phone,
          islemIds: [newIslem.id],
        };
        api
          .post(url.hastalar, newHasta)
          .then((res) => {
            dispatch({ type: actionTypes.ADD_HASTA, payload: newHasta });
            navigate("/hastalar");
          })
          .catch((err) => console.log("HastaEkle sayfası postHasta err", err));
      })
      .catch((err) => console.log("HastaEkle sayfası postIslem err", err));
  };

  if (hastalarState.success !== true) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Header />
      <form style={{ margin: "50px" }} onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hasta Adı"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hasta Soyadı"
            variant="outlined"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            type={"number"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Telefon Numarası"
            variant="outlined"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hastanın Şikayeti"
            variant="outlined"
            value={sikayet}
            onChange={(event) => setSikayet(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <Button type="submit" variant="contained">
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HastaEkle;
