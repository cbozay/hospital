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

import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

import EditHastaModal from "../components/EditHastaModel";
import { api } from "../api/api";
import { url } from "../api/url";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup } from "@mui/material";

const Hastalar = (props) => {
  const dispatch = useDispatch();
  const { hastalarState, randevularState } = useSelector((state) => state);
  const navigate = useNavigate();
  const [updateComponent, setUpdateComponent] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedHasta, setSelectedHasta] = useState(null);
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
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer
          style={{ marginTop: "50px", width: 900 }}
          component={Paper}
        >
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={() => navigate("/hasta-ekle")} variant="contained">
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
                <TableCell></TableCell>
                <TableCell>Adı</TableCell>
                <TableCell>Soyadı</TableCell>
                <TableCell>Telefon Numarası</TableCell>
                <TableCell align="right">İşlem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hastalarState.hastalar.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    Kayıtlı Hasta Bulunmamaktadır
                  </TableCell>
                </TableRow>
              )}
              {hastalarState.hastalar
                .filter((hasta) => {
                  if (hastalarState.search === "") {
                    return hasta;
                  } else if (
                    hasta.name
                      .toLowerCase()
                      .includes(hastalarState.search.toLowerCase())
                  ) {
                    return hasta;
                  }
                })
                .map((hasta) => (
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
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                      >
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
                ))}
            </TableBody>
          </Table>
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
