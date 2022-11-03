import React, { useState, useEffect } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddTedaviModal = (props) => {
  const { open, handleClose, hastaIslemi, setButtonHandler } = props;
  const [tedavi, setTedavi] = useState("");
  const [ilac, setIlac] = useState("");
  //   const[updatedTedavi, setUpdatedTedavi] = useState(false);

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
    axios
      .put(`http://localhost:3004/islemler/${hastaIslemi.id}`, EklenenTedavi)
      .then((res) => {
        setButtonHandler(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 style={{ textAlign: "center" }}>Tedavi Ekle</h1>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "20px 0px",
              }}
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Uygulanan Tedavi"
                variant="outlined"
                value={tedavi}
                onChange={(e) => setTedavi(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "20px 0px",
              }}
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Yazılan İlaçlar"
                variant="outlined"
                value={ilac}
                onChange={(e) => setIlac(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
                gap: "20px",
              }}
            >
              <Button onClick={handleClose} variant="outlined" color="error">
                Vazgeç
              </Button>
              <Button type="submit" variant="contained">
                Kaydet
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTedaviModal;
