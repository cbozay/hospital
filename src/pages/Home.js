import Header from "../components/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ButtonGroup } from "@mui/material";
import { api } from "../api/api";
import { url } from "../api/url";
import actionTypes from "../redux/actions/actionTypes";

const Home = () => {
  const { hastalarState, randevularState } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const sortedRandevular = randevularState.randevular.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

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
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer
          style={{ marginTop: "50px", width: 1000 }}
          component={Paper}
        >
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={() => navigate("/randevu-ekle")}
              variant="contained"
            >
              Randevu Ekle
            </Button>
          </div>

          <Table sx={{}} aria-label="simple table">
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
                <TableCell align="right">Adı</TableCell>
                <TableCell align="right">Soyadı</TableCell>
                <TableCell align="right">Telefon Numarası</TableCell>
                <TableCell align="right">İşlem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRandevular.map((randevu) => {
                const aradigimHasta = hastalarState.hastalar.find(
                  (hasta) => hasta.id === randevu.hastaId
                );

                var appointmentDate = new Date(randevu.date);
                if (checkDate.getTime() > appointmentDate.getTime()) {
                  return false;
                }

                return (
                  <TableRow
                    style={{
                      backgroundColor:
                        appointmentDate.getTime() - checkDate.getTime() <=
                          300000 && "yellow",
                    }}
                    key={randevu.id}
                  >
                    <TableCell component="th" scope="row">
                      {new Date(randevu?.date).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">{aradigimHasta?.name}</TableCell>
                    <TableCell align="right">
                      {aradigimHasta?.surname}
                    </TableCell>
                    <TableCell align="right">{aradigimHasta?.phone}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button variant="outlined" color="primary">
                          Düzenle
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(randevu.id)}
                        >
                          Sil
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() =>
                            navigate(`/randevu-detay/${randevu.id}`)
                          }
                        >
                          Detaylar
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
