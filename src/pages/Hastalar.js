import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../components/Header";
import Button from "@mui/material/Button";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Pagination from "@mui/material/Pagination";

import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

import EditHastaModal from "../components/EditHastaModel";
import { api } from "../api/api";
import { url } from "../api/url";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup } from "@mui/material";
import BackDrop from "../components/Backdrop";
import HastalarTableBody from "../components/HastalarTableBody";

const Hastalar = (props) => {
  const dispatch = useDispatch();
  const { hastalarState, randevularState } = useSelector((state) => state);
  const navigate = useNavigate();
  const [updateComponent, setUpdateComponent] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedHasta, setSelectedHasta] = useState(null);

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

  const handleClose = () => {
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
      })
      .catch((err) => console.log("hastalar sayfası hastaDelete err", err));
  };

  if (hastalarState.success !== true || randevularState.success !== true) {
    return <BackDrop />;
  }

  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer
          style={{ marginTop: "75px", width: 900 }}
          component={Paper}
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
              }}
            >
              <b>*</b>
              <b
                style={{
                  borderBottom: "1px solid",
                }}
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
    </div>
  );
};

export default Hastalar;
