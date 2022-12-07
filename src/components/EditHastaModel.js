import React, { useState, useEffect } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";
import { api } from "../api/api";
import { url } from "../api/url";
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FileUploadIcon from "@mui/icons-material/FileUpload";

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

const EditHastaModal = (props) => {
  const dispatch = useDispatch();
  const {
    open,
    handleClose,
    hasta,
    hastalar,
    updateComponent,
    setUpdateComponent,
  } = props;
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");
  const [name, setName] = useState(hasta?.name);
  const [hasNameError, setHasNameError] = useState(false);
  const [surname, setSurname] = useState(hasta?.surname);
  const [hasSurnameError, setHasSurnameError] = useState(false);
  const [phone, setPhone] = useState(hasta?.phone);
  const [hasPhoneError, setHasPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

  useEffect(() => {
    setImg(hasta?.img);
    setName(hasta?.name);
    setSurname(hasta?.surname);
    setPhone(hasta?.phone);
  }, [hasta]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "") {
      setHasNameError(true);
      setTimeout(() => {
        setHasNameError(false);
      }, 3000);
      return;
    }
    if (surname === "") {
      setHasSurnameError(true);
      setTimeout(() => {
        setHasSurnameError(false);
      }, 3000);
      return;
    }
    if (phone === "") {
      setHasPhoneError(true);
      setPhoneErrorMessage("*Telefon alanı zorunludur ve 11 haneli olmalıdır");
      setTimeout(() => {
        setHasPhoneError(false);
        setPhoneErrorMessage("");
      }, 3000);
      return;
    }
    if (phone.length !== 11) {
      setHasPhoneError(true);
      setPhoneErrorMessage("*Telefon alanı 11 haneli olmalıdır");
      setTimeout(() => {
        setHasPhoneError(false);
        setPhoneErrorMessage("");
      }, 3000);
      return;
    }

    const filteredHastalar = hastalar.filter(
      (item) => item.phone !== hasta.phone
    );
    const hasNumber = filteredHastalar.find((hasta) => hasta.phone === phone);

    if (hasNumber !== undefined) {
      alert("Bu numarayla kayıtlı bir hasta zaten vardır!");
      return;
    }
    const updatedHasta = {
      ...hasta,
      img: img,
      name: name,
      surname: surname,
      phone: phone,
    };
    api
      .put(url.hastalar + "/" + hasta.id, updatedHasta)
      .then((response) => {
        dispatch({ type: actionTypes.EDIT_HASTA, payload: updatedHasta });
        handleClose();
        setUpdateComponent(!updateComponent);
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
          {/* <h1 style={{ textAlign: "center" }}>Hasta Düzenle</h1> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0px",
            }}
          >
            <div
              style={{
                height: "175px",
                width: "125px",
                border: "1px solid",
                borderRadius: "50%",
              }}
            >
              {img ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "173.5px",
                  }}
                >
                  <img
                    style={{
                      height: "100%",
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
                    height: "175px",
                  }}
                >
                  <PermIdentityIcon
                    style={{
                      height: "175px",
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
              style={{ width: "600px", border: "1px solid #bbb" }}
              variant="raised"
              type="submit"
            >
              <input
                style={{ width: "100%" }}
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
                alignItems: "center",
                margin: "20px 0px",
              }}
            >
              <TextField
                style={{ width: "600px" }}
                id="outlined-basic"
                label="Hasta Adı"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {hasNameError && (
                <p>
                  <small style={{ color: "orangered" }}>
                    *İsim alanı zorunludur
                  </small>
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
                alignItems: "center",
              }}
            >
              <TextField
                style={{ width: "600px" }}
                id="outlined-basic"
                label="Hasta Soyadı"
                variant="outlined"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
              {hasSurnameError && (
                <p>
                  <small style={{ color: "orangered" }}>
                    *Soyisim alanı zorunludur
                  </small>
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
                alignItems: "center",
              }}
            >
              <TextField
                style={{ width: "600px" }}
                id="outlined-basic"
                label="Telefon Numarası"
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              {hasPhoneError && (
                <p>
                  <small style={{ color: "orangered" }}>
                    {phoneErrorMessage}
                  </small>
                </p>
              )}
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

export default EditHastaModal;
