import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useNavigate } from "react-router-dom";

const HastalarTableBody = ({
  hasta,
  setOpenEditModal,
  setSelectedHasta,
  handleDeleteHasta,
}) => {
  const navigate = useNavigate();

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
          <Button
            onClick={() => handleDeleteHasta(hasta)}
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
    </TableRow>
  );
};

export default HastalarTableBody;
