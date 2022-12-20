import React, { useState } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";
import { api } from "../api/api";
import { url } from "../api/url";
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddTedaviModal = (props) => {
  const { open, handleClose, hastaIslemi } = props;
  const dispatch = useDispatch();
  const [tedavi, setTedavi] = useState("");
  const [ilac, setIlac] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (tedavi === "") {
      alert("Lütfen yapılan tedaviyi giriniz!");
      return;
    }

    const EklenenTedavi = {
      ...hastaIslemi,
      uygulananTedavi: tedavi,
      yazilanIlaclar: ilac,
    };
    api
      .put(url.islemler + "/" + hastaIslemi.id, EklenenTedavi)
      .then((res) => {
        dispatch({ type: actionTypes.EDIT_ISLEM, payload: EklenenTedavi });
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 style={{ textAlign: "center" }}>Tedavi Ekle</h1>

        <form
          style={{
            display: "flex",
            justifyItems: "center",
            flexDirection: "column",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            style={{ width: "100%", marginBottom: "10px" }}
            id="outlined-basic"
            label="Uygulanan Tedavi"
            variant="outlined"
            value={tedavi}
            onChange={(e) => setTedavi(e.target.value)}
          />

          <TextField
            style={{ width: "100%" }}
            id="outlined-basic"
            label="Yazılan İlaçlar"
            variant="outlined"
            value={ilac}
            onChange={(e) => setIlac(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0px",
              gap: "20px",
            }}
          >
            <Button onClick={handleClose} variant="contained" color="error">
              Vazgeç
            </Button>
            <Button type="submit" variant="contained">
              Kaydet
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTedaviModal;
