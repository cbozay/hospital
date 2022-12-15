import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";
import { url } from "../api/url";
import actionTypes from "../redux/actions/actionTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const RandevuDuzenleModal = (props) => {
  const { randevularState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [date, setDate] = React.useState(dayjs(props.randevu?.date));
  const [sikayet, setSikayet] = React.useState(props.guncelIslem?.sikayet);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (date === "" || sikayet === "") {
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

    const updatedRandevu = {
      ...props.randevu,
      date,
    };
    const updatedIslem = {
      ...props.guncelIslem,
      sikayet,
    };

    api
      .put(url.randevular + "/" + props.randevu.id, updatedRandevu)
      .then((resRandevu) => {
        dispatch({ type: actionTypes.EDIT_RANDEVU, payload: updatedRandevu });
        api
          .put(url.islemler + "/" + props.guncelIslem.id, updatedIslem)
          .then((resIslem) => {
            dispatch({ type: actionTypes.EDIT_ISLEM, payload: updatedIslem });
            props.handleClose();
          })
          .catch((errIslem) => console.log(errIslem));
      })
      .catch((errRandevu) => console.log(errRandevu));
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: "25px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Date&Time picker"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                {/* <input
            value={date}
            // defaultValue={new Date("dd/mm/yyyy hh:mm")}
            onChange={(event) => setDate(event.target.value)}
            type={"datetime-local"}
          /> */}
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
                  value={props.aradigimHasta?.phone}
                  disabled
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
                  style={{ width: "350px" }}
                  id="outlined-basic"
                  label="Hasta Adı"
                  variant="outlined"
                  value={props.aradigimHasta?.name}
                  disabled
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
                  style={{ width: "350px" }}
                  id="outlined-basic"
                  label="Hasta Soyadı"
                  variant="outlined"
                  value={props.aradigimHasta?.surname}
                  disabled
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
                  style={{ width: "350px" }}
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
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default RandevuDuzenleModal;
