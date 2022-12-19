import Header from "../components/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { url } from "../api/url";
import actionTypes from "../redux/actions/actionTypes";
import RandevuTableBody from "../components/RandevuTableBody";
import Switch from "@mui/material/Switch";
import Zoom from "@mui/material/Zoom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import * as React from "react";
import Popover from "@mui/material/Popover";
import { Pagination, Typography } from "@mui/material";
import BackDrop from "../components/Backdrop";

const Home = () => {
  const { hastalarState, randevularState, islemlerState } = useSelector(
    (state) => state
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const sortedRandevular = randevularState.randevular.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const guncelRandevular = sortedRandevular.filter(
    (randevu) => new Date(randevu.date).getTime() > new Date().getTime()
  );

  const gecmisRandevular = sortedRandevular.filter(
    (randevu) => new Date(randevu.date).getTime() < new Date().getTime()
  );

  const [pageGuncel, setPageGuncel] = useState(1);
  const handleSearchGuncel = (event, value) => {
    setPageGuncel(value);
  };
  const startIndexGuncel = (pageGuncel - 1) * 5;
  const paginatedGüncelRandevular = guncelRandevular.slice(
    startIndexGuncel,
    startIndexGuncel + 5
  );

  const [pageGecmis, setPageGecmis] = useState(1);
  const handleSearchGecmis = (event, value) => {
    setPageGecmis(value);
  };
  const startIndexGecmis = (pageGecmis - 1) * 5;

  const paginatedGecmisRandevular = gecmisRandevular.slice(
    startIndexGecmis,
    startIndexGecmis + 5
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //   WARNING:It has been made possible the automatic control mechanism
  // to realize refreshment of the page one time within 1 second.
  // So componentWillUpdate has been realized through setInterval function.
  // In order to be able to realize componentWillUnmount(as left from page),
  // function clearInterval() has been returned. The reason of
  // componentWillUnmount is that we do not want to continue the check process
  // as we leave the page.
  const [checkDate, setCheckDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCheckDate(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleDelete = (id) => {
    api
      .delete(url.randevular + "/" + id)
      .then((resRandevu) => {
        dispatch({ type: actionTypes.DELETE_RANDEVU, payload: id });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (randevularState.success !== true || hastalarState.success !== true) {
    return <BackDrop />;
  }

  return (
    <div>
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "75px",
        }}
      >
        <TableContainer
          style={{
            marginTop: "75px",
            width: 900,
            borderRadius: "5px 5px 5px 0",
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
              }}
            >
              <b>*</b>
              <b
                style={{
                  borderBottom: "1px solid",
                }}
              >
                Sistemde kayıtlı bulunan güncel randevu sayısı:
                <big>
                  {" "}
                  <b>{guncelRandevular.length}</b>
                </big>
              </b>
            </p>

            <Button
              onClick={() => navigate("/randevu-ekle")}
              variant="outlined"
              style={{ border: "2px solid", margin: 1 }}
            >
              Randevu Ekle
            </Button>
          </div>

          <Table aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "#999",
                "& th": {
                  fontSize: "1.25rem",
                  color: "#fff",
                },
              }}
            >
              <TableRow>
                <TableCell>Tarih</TableCell>
                <TableCell>Adı</TableCell>
                <TableCell>Soyadı</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell>Şikayet</TableCell>
                <TableCell align="right">İşlem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hastalarState.search
                ? sortedRandevular.map((randevu) => {
                    const aradigimHasta = hastalarState.hastalar
                      .filter((hasta) => {
                        if (
                          hasta.name
                            .toLowerCase()
                            .includes(hastalarState.search.toLowerCase())
                        ) {
                          return hasta;
                        }
                      })
                      .find((hasta) => hasta.id === randevu.hastaId);

                    const guncelIslem = islemlerState.islemler.find((islem) =>
                      aradigimHasta?.islemIds.length === 1
                        ? aradigimHasta?.islemIds[0] === islem.id
                        : aradigimHasta?.islemIds.at(-1) === islem.id
                    );

                    const aradigimIslem = aradigimHasta?.islemIds.map(
                      (hastaIslemId) => {
                        const islemlerim = islemlerState.islemler.find(
                          (islem) => hastaIslemId === islem.id
                        );
                        return islemlerim;
                      }
                    );

                    var appointmentDate = new Date(randevu.date);
                    if (checkDate.getTime() > appointmentDate.getTime()) {
                      return false;
                    }
                    return (
                      <RandevuTableBody
                        key={randevu.id}
                        appointmentDate={appointmentDate}
                        randevu={randevu}
                        checkDate={checkDate}
                        aradigimHasta={aradigimHasta}
                        handleDelete={handleDelete}
                        aradigimIslem={aradigimIslem}
                        guncelIslem={guncelIslem}
                      />
                    );
                  })
                : paginatedGüncelRandevular.map((randevu) => {
                    const aradigimHasta = hastalarState.hastalar
                      .filter((hasta) => {
                        if (
                          hasta.name
                            .toLowerCase()
                            .includes(hastalarState.search.toLowerCase())
                        ) {
                          return hasta;
                        }
                      })
                      .find((hasta) => hasta.id === randevu.hastaId);

                    const guncelIslem = islemlerState.islemler.find((islem) =>
                      aradigimHasta?.islemIds.length === 1
                        ? aradigimHasta?.islemIds[0] === islem.id
                        : aradigimHasta?.islemIds.at(-1) === islem.id
                    );

                    const aradigimIslem = aradigimHasta?.islemIds.map(
                      (hastaIslemId) => {
                        const islemlerim = islemlerState.islemler.find(
                          (islem) => hastaIslemId === islem.id
                        );
                        return islemlerim;
                      }
                    );

                    var appointmentDate = new Date(randevu.date);
                    if (checkDate.getTime() > appointmentDate.getTime()) {
                      return false;
                    }
                    return (
                      <RandevuTableBody
                        key={randevu.id}
                        appointmentDate={appointmentDate}
                        randevu={randevu}
                        checkDate={checkDate}
                        aradigimHasta={aradigimHasta}
                        handleDelete={handleDelete}
                        aradigimIslem={aradigimIslem}
                        guncelIslem={guncelIslem}
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
              page={pageGuncel}
              onChange={handleSearchGuncel}
              count={Math.ceil(guncelRandevular.length / 5)}
            />
          </div>
        </TableContainer>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "75px",
        }}
      >
        <TableContainer
          // component={checked && Paper}
          style={{
            width: 900,

            borderRadius: checked && "0 5px 5px 5px",
            backgroundColor: checked && "#fff",
          }}
        >
          <Box>
            <FormControlLabel
              style={{
                marginLeft: "0px",

                borderRadius: "0 0 5px 5px",
                backgroundColor: "#fff",
              }}
              control={<Switch checked={checked} onChange={handleChange} />}
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}

              // label="Show"
            />
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
                marginLeft: "59px",
                marginTop: "1px",
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                // vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ padding: "6px" }}>Geçmiş Randevular</Typography>
            </Popover>
            <Box sx={{ display: "flex" }}>
              <Zoom in={checked}>
                <Table aria-label="simple table">
                  <TableHead
                    sx={{
                      backgroundColor: "#999",
                      "& th": {
                        fontSize: "1.25rem",
                        color: "#fff",
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell>Tarih</TableCell>
                      <TableCell>Adı</TableCell>
                      <TableCell>Soyadı</TableCell>
                      <TableCell>Telefon</TableCell>
                      <TableCell>Şikayet</TableCell>

                      <TableCell align="right">İşlem</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {gecmisRandevular.length === 0 && (
                      <TableRow>
                        <TableCell align="center" colSpan={12}>
                          <big>
                            Sistemde süresi geçen herhangi bir randevu yoktur.
                          </big>
                        </TableCell>
                      </TableRow>
                    )}
                    {hastalarState.search
                      ? sortedRandevular.map((randevu) => {
                          const aradigimHasta = hastalarState.hastalar
                            .filter((hasta) => {
                              if (
                                hasta.name
                                  .toLowerCase()
                                  .includes(hastalarState.search.toLowerCase())
                              ) {
                                return hasta;
                              }
                            })
                            .find((hasta) => hasta.id === randevu.hastaId);

                          const guncelIslem = islemlerState.islemler.find(
                            (islem) =>
                              aradigimHasta?.islemIds.length === 1
                                ? aradigimHasta?.islemIds[0] === islem.id
                                : aradigimHasta?.islemIds.at(-1) === islem.id
                          );

                          const aradigimIslem = aradigimHasta?.islemIds.map(
                            (hastaIslemId) => {
                              const islemlerim = islemlerState.islemler.find(
                                (islem) => hastaIslemId === islem.id
                              );
                              return islemlerim;
                            }
                          );

                          var appointmentDate = new Date(randevu.date);
                          if (checkDate.getTime() < appointmentDate.getTime()) {
                            return false;
                          }
                          return (
                            <RandevuTableBody
                              key={randevu.id}
                              appointmentDate={appointmentDate}
                              randevu={randevu}
                              checkDate={checkDate}
                              aradigimHasta={aradigimHasta}
                              handleDelete={handleDelete}
                              aradigimIslem={aradigimIslem}
                              guncelIslem={guncelIslem}
                            />
                          );
                        })
                      : paginatedGecmisRandevular.map((randevu) => {
                          const aradigimHasta = hastalarState.hastalar
                            .filter((hasta) => {
                              if (
                                hasta.name
                                  .toLowerCase()
                                  .includes(hastalarState.search.toLowerCase())
                              ) {
                                return hasta;
                              }
                            })
                            .find((hasta) => hasta.id === randevu.hastaId);

                          const guncelIslem = islemlerState.islemler.find(
                            (islem) =>
                              aradigimHasta?.islemIds.length === 1
                                ? aradigimHasta?.islemIds[0] === islem.id
                                : aradigimHasta?.islemIds.at(-1) === islem.id
                          );

                          const aradigimIslem = aradigimHasta?.islemIds.map(
                            (hastaIslemId) => {
                              const islemlerim = islemlerState.islemler.find(
                                (islem) => hastaIslemId === islem.id
                              );
                              return islemlerim;
                            }
                          );

                          var appointmentDate = new Date(randevu.date);
                          if (checkDate.getTime() < appointmentDate.getTime()) {
                            return false;
                          }
                          return (
                            <RandevuTableBody
                              key={randevu.id}
                              appointmentDate={appointmentDate}
                              randevu={randevu}
                              checkDate={checkDate}
                              aradigimHasta={aradigimHasta}
                              handleDelete={handleDelete}
                              aradigimIslem={aradigimIslem}
                              guncelIslem={guncelIslem}
                            />
                          );
                        })}
                  </TableBody>
                </Table>
              </Zoom>
              {/* <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
          {icon}
        </Zoom> */}
            </Box>
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "5px",
            }}
          >
            <Pagination
              page={pageGecmis}
              onChange={handleSearchGecmis}
              count={Math.ceil(gecmisRandevular.length / 5)}
            />
          </div>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
