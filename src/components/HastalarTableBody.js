import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

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

const HastalarTableBody = ({
  hasta,
  setOpenEditModal,
  setSelectedHasta,
  handleDeleteHasta,
}) => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleDeleteClick = () => {};

  return (
    <TableRow
      key={hasta.id}
      sx={{
        "& th": {
          fontSize: "1.25rem",
        },
      }}
    >
      <TableCell
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          // border: "none",
          borderRadius: "50%",
        }}
      >
        {hasta.img ? (
          <div
            style={{
              width: "35px",
              height: "40px",
              border: "1px solid",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              style={{
                width: "34px",
                borderRadius: "50%",
                height: "49px",
              }}
              src={hasta.img}
              alt="resim"
            />
          </div>
        ) : (
          <div
            style={{
              width: "35px",
              height: "40px",
              border: "1px solid",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PermIdentityIcon
              style={{
                fontSize: "40px",
                // border: "1px solid",
                width: "35px",
                borderRadius: "50%",
              }}
            />
          </div>
        )}
      </TableCell>
      <TableCell>{hasta.name}</TableCell>
      <TableCell>{hasta.surname}</TableCell>
      <TableCell>{hasta.phone}</TableCell>
      <TableCell align="right">
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            onClick={() => {
              setOpenEditModal(true);
              setSelectedHasta(hasta);
            }}
            variant="outlined"
            color="secondary"
          >
            Düzenle
          </Button>
          {/* <Button
            onClick={() => handleDeleteHasta(hasta)}
            variant="outlined"
            color="error"
          >
            Sİl
          </Button> */}
          <Button
            onClick={() => setOpen(true)}
            variant="outlined"
            color="error"
          >
            Sİl
          </Button>
          <Button
            onClick={() => navigate(`/detaylar/${hasta.id}`)}
            variant="outlined"
            color="primary"
          >
            Detaylar
          </Button>
        </ButtonGroup>
      </TableCell>
      {open === true && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  marginBottom: "3px",
                }}
                id="transition-modal-description"
              >
                {`${hasta.name} ${hasta.surname} isimli hastayanın kaydını silmek istediğinize emin misiniz?`}
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{ margin: "5px" }}
                  variant="contained"
                  onClick={() => setOpen(false)}
                >
                  Vazgeç
                </Button>
                <Button
                  style={{ margin: "5px" }}
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleDeleteHasta(hasta);
                    setOpen(false);
                  }}
                >
                  Sİl
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      )}
    </TableRow>
  );
};

export default HastalarTableBody;
