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
  const [date, setDate] = React.useState(dayjs(new Date()));

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
