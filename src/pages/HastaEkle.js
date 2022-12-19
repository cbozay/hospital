import React, { useState } from "react";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import HideImageOutlinedIcon from "@mui/icons-material/HideImageOutlined";

import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { url } from "../api/url";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { TableContainer, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import BackDrop from "../components/Backdrop";
import KaydetmeAlert from "../components/KaydetmeAlert";

const HastaEkle = (props) => {
  const navigate = useNavigate();
  const { hastalarState } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [sikayet, setSikayet] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");
  console.log(img);

  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    event.preventDefault();

    let base64 = "";
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => {
      base64 = reader.result;
      console.log(reader.result);
      setImg(reader.result);
    };

    reader.onerror = function (error) {
      console.log("Error:  ", error);
    };
  };

  const handleSubmit = async (event) => {
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

    if (hasNumber) {
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
          img: img,
        };
        api
          .post(url.hastalar, newHasta)
          .then((res) => {
            dispatch({ type: actionTypes.ADD_HASTA, payload: newHasta });
          })
          .catch((err) => console.log("HastaEkle sayfası postHasta err", err));
      })
      .catch((err) => console.log("HastaEkle sayfası postIslem err", err));
    await setOpen(true);
    await setTimeout(() => {
      navigate("/hastalar");
    }, 1000);
  };

  if (hastalarState.success !== true) {
    return <BackDrop />;
  }

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TableContainer
          component={Paper}
          style={{
            backgroungColor: "#fff",
            border: "1px solid",
            width: "500px",
            marginTop: "75px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "25px",
            }}
          >
            <div
              style={{
                height: "250px",
                width: "175px",
                border: "1px solid",
                borderRadius: "50%",
              }}
            >
              {img ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{
                      height: "250px",
                      width: "100%",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 40px",
                      borderRadius: "50%",
                    }}
                    src={img}
                    alt="aa"
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "250px",
                  }}
                >
                  <HideImageOutlinedIcon
                    style={{
                      height: "100px",
                      width: "100%",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0px",
            }}
            onSubmit={handleChange}
          >
            <Button
              style={{ width: "350px", border: "1px solid #bbb" }}
              variant="raised"
              type="submit"
            >
              <input
                accept="image/*"
                type={"file"}
                onChange={(event) => setFile(event.target.files[0])}
              />
              <FileUploadIcon style={{ fontSize: "40px" }} />
            </Button>
          </form>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
              }}
            >
              <TextField
                style={{ width: "350px" }}
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
                style={{ width: "350px" }}
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
                style={{ width: "350px" }}
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
                style={{ width: "350px" }}
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
        </TableContainer>
      </div>
      {open === true && <KaydetmeAlert open={open} handleClose={handleClose} />}
    </div>
  );
};

export default HastaEkle;
