import { TableCell, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RandevuTableBody = (props) => {
  const navigate = useNavigate();

  return (
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
      <TableCell align="right">
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          {props.checkDate.getTime() < props.appointmentDate.getTime() && (
            <Button variant="outlined" color="primary">
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
            color={
              props.appointmentDate.getTime() - props.checkDate.getTime() < 0
                ? "primary"
                : "secondary"
            }
            onClick={() => navigate(`/randevu-detay/${props.randevu.id}`)}
          >
            Detaylar
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default RandevuTableBody;
