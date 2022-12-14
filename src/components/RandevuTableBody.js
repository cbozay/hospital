import { TableCell, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RandevuDuzenleModal from "./RandevuDuzenleModal";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

const RandevuTableBody = (props) => {
  const navigate = useNavigate();
  const [openSikayet, setOpenSikayet] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenSikayet((previousOpen) => !previousOpen);
  };

  const canBeOpen = openSikayet && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!props.aradigimHasta?.name) {
    return false;
  }
  return (
    <>
      <TableRow
        style={{
          backgroundColor:
            props.appointmentDate.getTime() - props.checkDate.getTime() <=
              300000 && "yellow",
          backgroundColor:
            props.appointmentDate.getTime() - props.checkDate.getTime() < 0 &&
            "#ffcdd2",
        }}
        key={props.randevu.id}
      >
        <TableCell component="th" scope="row">
          {new Date(props.randevu?.date).toLocaleString()}
        </TableCell>
        <TableCell>{props.aradigimHasta?.name}</TableCell>
        <TableCell>{props.aradigimHasta?.surname}</TableCell>
        <TableCell>{props.aradigimHasta?.phone}</TableCell>
        <TableCell>
          <div>
            <Button
              size="small"
              style={{ border: "1px solid" }}
              aria-describedby={id}
              type="button"
              onClick={handleClick}
            >
              göster
            </Button>
            <Popper id={id} open={openSikayet} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Box
                    align="center"
                    sx={{
                      border: 1,
                      pt: 2,
                      px: 2,
                      bgcolor: "background.paper",
                    }}
                  >
                    <div>
                      <h6 style={{ borderBottom: "1px solid" }}>
                        Güncel Şikayet
                      </h6>
                      <p>{props.guncelIslem.sikayet}</p>
                    </div>
                    <div>
                      <h6 style={{ borderBottom: "1px solid" }}>
                        Tüm Şikayetler
                      </h6>
                      <p>
                        {props.aradigimIslem?.map((islem) => {
                          return <div>{islem.sikayet}</div>;
                        })}
                      </p>
                    </div>
                  </Box>
                </Fade>
              )}
            </Popper>
          </div>
        </TableCell>
        <TableCell align="right">
          <div
            style={{
              width: "310px",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              {props.checkDate.getTime() < props.appointmentDate.getTime() && (
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  color="secondary"
                >
                  Düzenle
                </Button>
              )}
              <Button
                variant="outlined"
                color="error"
                onClick={() => props.handleDelete(props.randevu.id)}
              >
                Sİl
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/randevu-detay/${props.randevu.id}`)}
              >
                Detaylar
              </Button>
            </ButtonGroup>
          </div>
        </TableCell>
      </TableRow>
      <RandevuDuzenleModal open={open} handleClose={handleClose} />
    </>
  );
};

export default RandevuTableBody;
