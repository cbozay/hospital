import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import Backdrop from "@mui/material/Backdrop";

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

const DeleteRandevuModal = ({
  openDelete,
  handleClose,
  aradigimHasta,
  randevu,
  setOpenDelete,
  handleDelete,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openDelete}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openDelete}>
        <Box sx={style}>
          <Typography id="transition-modal-description">
            {`${aradigimHasta?.name} ${
              aradigimHasta?.surname
            } isimli hastaya ait ${new Date(
              randevu?.date
            ).toLocaleString()} tarihli randevuyu silmek istediğinize emin misiniz?`}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => setOpenDelete(false)}
              style={{ margin: "5px" }}
              variant="contained"
            >
              Vazgeç
            </Button>
            <Button
              onClick={() => handleDelete()}
              style={{ margin: "5px" }}
              variant="contained"
              color="error"
            >
              Sİl
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteRandevuModal;
