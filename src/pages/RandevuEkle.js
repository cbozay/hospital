import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import { api } from "../api/api";
import { url } from "../api/url";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

const RandevuEkle = (props) => {
  const { hastalarState, randevularState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [sikayet, setSikayet] = useState("");
  const [hasHasta, setHasHasta] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(date);
    if (
      date === "" ||
      phone === "" ||
      name === "" ||
      surname === "" ||
      sikayet === ""
    ) {
      alert("Bütün alanları girmek zorunludur");
      return;
    }

    const searchedDate = randevularState.randevular.find(
      (item) => item.date === date
    );

    if (searchedDate) {
      alert("Bu hastaya ait bir randevu zaten mevcuttur.!");
      return;
    }

    if (phone.length !== 11) {
      alert("Telefon numarası 11 hane olmak zorundadır");
      return;
    }
    if (hasHasta) {
      const newRandevu = {
        id: String(new Date().getTime()),
        date: date,
        hastaId: hasHasta.id,
      };
      const newIslem = {
        id: String(new Date().getTime() + 1),
        sikayet: sikayet,
        uygulananTedavi: "",
        yazilanIlaclar: [],
      };
      const updatedHasta = {
        ...hasHasta,
        islemIds: [...hasHasta.islemIds, newIslem.id],
      };
      await api
        .post(url.randevular, newRandevu)
        .then((res) => {
          console.log("randevu kayıt", res);
          dispatch({ type: actionTypes.ADD_RANDEVU, payload: newRandevu });
        })
        .catch((err) => console.log(err));
      await api
        .post(url.islemler, newIslem)
        .then((res) => {
          console.log("işlem kayıt", res);
          dispatch({ type: actionTypes.ADD_ISLEM, payload: newIslem });
        })
        .catch((err) => console.log(err));
      await api
        .put(url.hastalar + "/" + hasHasta.id, updatedHasta)
        .then((res) => {
          console.log("hasta update", res);
          dispatch({ type: actionTypes.EDIT_HASTA, payload: updatedHasta });
        })
        .catch((err) => console.log(err));
      // Json-server düşmesin diye yazıldı
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      const newIslem = {
        id: String(new Date().getTime()),
        sikayet: sikayet,
        uygulananTedavi: "",
        yazilanIlaclar: [],
      };
      const newHasta = {
        id: String(new Date().getTime() + 1),
        name: name,
        surname: surname,
        islemIds: [newIslem.id],
        phone: phone,
      };
      const newRandevu = {
        id: String(new Date().getTime() + 2),
        date: date,
        hastaId: newHasta.id,
      };
      await api
        .post(url.randevular, newRandevu)
        .then((res) => {
          console.log("randevu kayıt", res);
          dispatch({ type: actionTypes.ADD_RANDEVU, payload: newRandevu });
        })
        .catch((err) => console.log(err));
      await api
        .post(url.islemler, newIslem)
        .then((res) => {
          console.log("işlem kayıt", res);
          dispatch({ type: actionTypes.ADD_ISLEM, payload: newIslem });
        })
        .catch((err) => console.log(err));

      await api
        .post(url.hastalar, newHasta)
        .then((res) => {
          console.log("hasta kayıt", res);
          dispatch({ type: actionTypes.ADD_HASTA, payload: newHasta });
        })
        .catch((err) => console.log(err));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    const arananHasta = hastalarState.hastalar.find(
      (item) => item.phone === String(event.target.value)
    );
    if (arananHasta !== undefined) {
      setName(arananHasta.name);
      setSurname(arananHasta.surname);
      setHasHasta(arananHasta);
    } else {
      setName("");
      setSurname("");
      setHasHasta(false);
    }
  };

  if (hastalarState.success !== true || randevularState.success !== true) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <input
            value={date}
            // defaultValue={new Date("dd/mm/yyyy hh:mm")}
            onChange={(event) => setDate(event.target.value)}
            type={"datetime-local"}
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
            onChange={handlePhoneChange}
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
            type={"text"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hasta Adı"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={hasHasta}
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
            type={"text"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hasta Soyadı"
            variant="outlined"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            disabled={hasHasta}
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
            type={"text"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Şikayet"
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

export default RandevuEkle;
