import React from "react";
import { Snackbar, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const KaydetmeAlert = ({ open, handleClose }) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Kaydetme işlemi başarılı.
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default KaydetmeAlert;
