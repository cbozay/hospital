import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Header from "../components/Header";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

import EditHastaModal from "../components/EditHastaModel";
import { api } from "../api/api";
import { url } from "../api/url";
import { useDispatch, useSelector } from "react-redux";
import BackDrop from "../components/Backdrop";
import HastalarTableBody from "../components/HastalarTableBody";

import SilmeAlert from "../components/SilmeAlert";

const Hastalar = (props) => {
  const dispatch = useDispatch();
  const { hastalarState, randevularState } = useSelector((state) => state);
  const navigate = useNavigate();
  const [updateComponent, setUpdateComponent] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedHasta, setSelectedHasta] = useState(null);

  // const [open, setOpen] = React.useState(false);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const startIndex = (page - 1) * 5;
  const paginatedHastalar = hastalarState.hastalar.slice(
    startIndex,
    startIndex + 5
  );
  // console.log(hastalarState.search);

  // useEffect(() => {
  //   const filteredHastalarName = hastalarState.hastalar.filter((hasta) =>
  //     hasta.name.toLowerCase().includes(hastalarState.search)
  //   );
  //   setFilteredSearchedName(filteredHastalarName);
  // }, [hastalarState.search]);

  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenEditModal(false);
  };

  const handleDeleteHasta = async (hasta) => {
    console.log({ hasta });

    api
      .delete(url.hastalar + "/" + hasta.id)
      .then((deleteHastaRes) => {
        dispatch({ type: actionTypes.DELETE_HASTA, payload: hasta.id });

        hasta.islemIds.map(async (islemId) => {
          console.log(">>>Hasta islem id  :", islemId);
          return await api
            .delete(url.islemler + "/" + islemId)
            .then((islemDeleteRes) => {
              dispatch({ type: actionTypes.DELETE_ISLEM, payload: islemId });
            })
            .catch((err) =>
              console.log("hastalar sayfası deleteIslem err", err)
            );
        });
        const filteredRandevular = randevularState.randevular.filter(
          (item) => item.hastaId === hasta.id
        );

        filteredRandevular.map(async (item) => {
          return await api
            .delete(url.randevular + "/" + item.id)
            .then((res) => {
              dispatch({
                type: actionTypes.DELETE_RANDEVU,
                payload: item.id,
              });
            })
            .catch((err) => console.log(err));
        });

        setUpdateComponent(!updateComponent);
        setOpen(true);
      })
      .catch((err) => console.log("hastalar sayfası hastaDelete err", err));
  };

  if (hastalarState.success !== true || randevularState.success !== true) {
    return <BackDrop />;
  }

  return (
    <div>
      <Header />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "75px" }}
      >
        <TableContainer
          style={{
            marginTop: "75px",
            width: 900,
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                opacity: "0.8",
                border: "1px solid",
                backgroundColor: "#ddd",
                padding: "5px",
                borderRadius: "5px 0 15px 0",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                height: "35px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <b>*</b>
              <b
                style={
                  {
                    // borderBottom: "1px solid",
                  }
                }
              >
                Sistemde kayıtlı bulunan toplam hasta sayısı:
                <big>
                  {" "}
                  <b>{hastalarState.hastalar.length}</b>
                </big>
              </b>
            </p>
            <Button
              onClick={() => navigate("/hasta-ekle")}
              variant="outlined"
              style={{ border: "2px solid", margin: 1 }}
            >
              Hasta Ekle
            </Button>
          </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#999" }}>
              <TableRow
                sx={{
                  backgroundColor: "#999",
                  "& th": {
                    fontSize: "1.25rem",
                    color: "#fff",
                  },
                }}
              >
                <TableCell align="center">Resim</TableCell>
                <TableCell>Adı</TableCell>
                <TableCell>Soyadı</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell align="right">İşlem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hastalarState.hastalar.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    <big> Sistemde kayıtlı herhangi bir hasta yoktur.</big>
                  </TableCell>
                </TableRow>
              )}
              {hastalarState.search
                ? hastalarState.hastalar
                    .filter((hasta) => {
                      if (
                        hasta.name
                          .toLowerCase()
                          .includes(hastalarState.search.toLowerCase())
                      ) {
                        return hasta;
                      }
                    })
                    .map((hasta) => {
                      return (
                        <HastalarTableBody
                          hasta={hasta}
                          setOpenEditModal={setOpenEditModal}
                          setSelectedHasta={setSelectedHasta}
                          handleDeleteHasta={handleDeleteHasta}
                        />
                      );
                    })
                : paginatedHastalar.map((hasta) => {
                    return (
                      <HastalarTableBody
                        hasta={hasta}
                        setOpenEditModal={setOpenEditModal}
                        setSelectedHasta={setSelectedHasta}
                        handleDeleteHasta={handleDeleteHasta}
                      />
                    );
                  })}
            </TableBody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "5px",
            }}
          >
            <Pagination
              page={page}
              onChange={handleChange}
              count={Math.ceil(hastalarState.hastalar.length / 5)}
            />
          </div>
        </TableContainer>
      </div>
      <EditHastaModal
        updateComponent={updateComponent}
        setUpdateComponent={setUpdateComponent}
        hastalar={hastalarState.hastalar}
        hasta={selectedHasta}
        open={openEditModal}
        handleClose={handleClose}
      />
      {open && <SilmeAlert open={open} handleClose={handleClose} />};
    </div>
  );
};

export default Hastalar;
