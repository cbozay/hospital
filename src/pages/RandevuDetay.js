import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { url } from "../api/url";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../components/Header";
import { Button, SwipeableDrawer } from "@mui/material";

const RandevuDetay = () => {
  const params = useParams();

  const [randevu, setRandevu] = useState(null);
  const [hasta, setHasta] = useState(null);
  const [islemlerim, setIslemlerim] = useState(null);
  console.log(islemlerim);
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    api
      .get(url.randevular + "/" + params.randevuId)
      .then((resRandevu) => {
        setRandevu(resRandevu.data);
        api
          .get(url.hastalar + "/" + resRandevu.data.hastaId)
          .then((resHasta) => {
            setHasta(resHasta.data);
            api
              .get(url.islemler)
              .then((resIslemler) => {
                // console.log(resIslemler.data);
                // const islemlerim = resIslemler.data?.map((islem) => {
                //   const filtered = hasta?.islemIds.filter(
                //     (hastaIslemId) => islem.id === hastaIslemId
                //   );
                //   console.log({ filtered });
                //   return filtered;
                // });
                // console.log({ islemlerim });

                const islemlerim = resHasta.data.islemIds.map((hastaId) => {
                  const seachedIslem = resIslemler.data.find(
                    (islem) => islem.id === hastaId
                  );

                  return seachedIslem;
                });

                setIslemlerim(islemlerim);
              })

              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  if (hasta === null || randevu === null || islemlerim === null) {
    <h1>Loading...</h1>;
    return;
  }

  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer
          component={Paper}
          style={{ marginTop: "50px", width: 1000 }}
        >
          <Table sx={{ minWidth: 650, marginTop: 5 }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#030538",

                  "& th": {
                    fontSize: "1.25rem",
                    color: "#fff",
                  },
                }}
              >
                <TableCell>Randevu Tarihi</TableCell>
                <TableCell align="right">Hasta Adı</TableCell>
                <TableCell align="right">Hasta Soyadı</TableCell>
                <TableCell align="right">Hasta Telefonu</TableCell>
                <TableCell align="right">Hastanın Geçmiş İşlemleri</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                    fontSize: "1.25rem",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {new Date(randevu?.date).toLocaleString()}
                </TableCell>
                <TableCell align="right">{hasta?.name}</TableCell>
                <TableCell align="right">{hasta?.surname}</TableCell>
                <TableCell align="right">{hasta?.phone}</TableCell>
                <TableCell align="right">
                  <div>
                    {["bottom"].map((anchor) => (
                      <React.Fragment key={anchor}>
                        {
                          <Button onClick={toggleDrawer(anchor, true)}>
                            göster
                          </Button>
                        }
                        <SwipeableDrawer
                          anchor={anchor}
                          open={state[anchor]}
                          onClose={toggleDrawer(anchor, false)}
                          onOpen={toggleDrawer(anchor, true)}
                        >
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                              <TableHead>
                                <TableRow
                                  sx={{
                                    backgroundColor: "#030538",

                                    "& th": {
                                      fontSize: "1.25rem",
                                      color: "#fff",
                                    },
                                  }}
                                >
                                  <TableCell>Şikayet</TableCell>
                                  <TableCell align="right">
                                    Uygulanan Tedavi
                                  </TableCell>
                                  <TableCell align="right">
                                    Yazılan İlaçlar
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {islemlerim?.map((islem, index) => {
                                  return (
                                    <TableRow
                                      key={index}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        {islem.sikayet}
                                      </TableCell>
                                      <TableCell align="right">
                                        {islem.uygulananTedavi
                                          ? islem.uygulananTedavi
                                          : "Herhangi bir tedavi uygulanmamıştır"}
                                      </TableCell>
                                      <TableCell align="right">
                                        {islem.yazilanIlaclar.length
                                          ? islem.yazilanIlaclar
                                          : "Herhangi bir ilaç yazılmamıştır"}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </SwipeableDrawer>
                      </React.Fragment>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RandevuDetay;
