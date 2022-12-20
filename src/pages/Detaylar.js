import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { api } from "../api/api";
import { url } from "../api/url";
import AddTedaviModal from "../components/AddTedaviModal";
import { useSelector } from "react-redux";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BackDrop from "../components/Backdrop";

const Detaylar = () => {
  const { hastaDetayId } = useParams();
  const { islemlerState } = useSelector((state) => state);
  const [hasta, setHasta] = useState(null);
  const [hastaIslemleri, setHastaIslemleri] = useState([]);
  const [buttonHandler, setButtonHandler] = useState(false);
  const [hastaIslem, setHastaIslem] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    api
      .get(url.hastalar + "/" + hastaDetayId)
      .then((resHasta) => {
        setHasta(resHasta.data);
        api
          .get(url.islemler)
          .then((resIslem) => {
            // setIslemler(resIslem.data);
            // const tempHastaIslemleri = [];
            // for (let i = 0; i < resHasta.data.islemIds.length; i++) {
            //   const islem = resIslem.data.find(
            //     (item) => item.id === resHasta.data.islemIds[i]
            //   );
            //   tempHastaIslemleri.push(islem);
            // }
            // console.log(tempHastaIslemleri);
            // setHastaIslemleri(tempHastaIslemleri);

            const hastam = resHasta.data.islemIds.map((hastaId) => {
              const seachedIslem = resIslem.data.find(
                (islem) => islem.id === hastaId
              );
              // console.log(seachedIslem);

              // const tempIslem = [];
              // tempIslem.push(seachedIslem);
              // // console.log("tempIslem", tempIslem);
              // setHastaIslemleri(tempIslem);
              return seachedIslem;
            });

            console.log("hastam", hastam);
            setHastaIslemleri(hastam);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((err) => console.log(err));
  }, [islemlerState.islemler]);

  if (hasta === null) {
    <BackDrop />;
    return;
  }

  return (
    <div>
      <Header />
      <div
        className="d-flex justify-content-center my-4"
        style={{ paddingTop: "80px" }}
      >
        <div
          className="border rounded p-4"
          style={{
            backgroundColor: "#fff",
            minWidth: "450px",
            boxShadow:
              " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
          <h3
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ borderBottom: "1px solid" }}>Hasta Kayıt No: </div>
              <div style={{ borderBottom: "1px solid" }}>
                Hasta Adı Soyadı:{" "}
              </div>
              <div style={{ borderBottom: "1px solid" }}>
                Hasta Telefon No:{" "}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",

                textAlign: "end",
              }}
            >
              <div>{hasta.id}</div>
              <div>
                {hasta.name} {hasta.surname}
              </div>
              <div>{hasta.phone}</div>
            </div>
          </h3>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ListItemButton
          style={{
            width: "300px",
            border: "1px solid",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
          onClick={handleClick}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Hasta İşlemlerİ" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {hastaIslemleri.map((hastaIslemi, index) => {
              return (
                <h4 key={index} className="d-flex justify-content-center">
                  <div
                    className="d-flex align-items-center"
                    style={{
                      margin: "5px 20px 5px 20px",
                      width: "100%",
                      border: "1px solid",
                      borderRadius: "5px",
                      padding: "10px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        marginRight: "3px",
                      }}
                    >
                      {index + 1 + "-"}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            borderBottom: "1px solid",
                          }}
                        >
                          Hasta Şikayet:
                        </div>
                        <div
                          style={{
                            borderBottom: "1px solid",
                          }}
                        >
                          Uygulanan Tedavi:
                        </div>
                        <div
                          style={{
                            borderBottom: "1px solid",
                          }}
                        >
                          Yazılan İlaçlar:
                        </div>
                      </div>

                      <div
                        style={{
                          marginLeft: "20px",
                        }}
                      >
                        <div style={{ fontWeight: "bold" }}>
                          {hastaIslemi.sikayet}
                        </div>

                        <div
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {hastaIslemi.uygulananTedavi ||
                          hastaIslemi.yazilanIlaclar.length ? (
                            <div>
                              <div>{hastaIslemi.uygulananTedavi}</div>
                              <div>{hastaIslemi.yazilanIlaclar}</div>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setButtonHandler(true);
                                setHastaIslem(hastaIslemi);
                              }}
                              style={{
                                fontSize: "15px",
                                height: "52px",
                                marginTop: "5px",
                                width: "100%",
                              }}
                              className="btn btn-sm btn-outline-primary"
                            >
                              Tedavi & İlaç Ekle
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </h4>
              );
            })}
          </List>
        </Collapse>
      </div>

      {/* <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{ border: "1px solid", margin: "20px" }}
                variant="raised"
                
              >
                Hasta İşlemlerİnİ Göster
              </Button>
            </div> */}

      <AddTedaviModal
        open={buttonHandler}
        handleClose={() => setButtonHandler(false)}
        hastaIslemi={hastaIslem}
      />
    </div>
  );
};

export default Detaylar;
