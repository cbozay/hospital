import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { api } from "../api/api";
import { url } from "../api/url";
import AddTedaviModal from "../components/AddTedaviModal";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const Detaylar = () => {
  const { hastaDetayId } = useParams();
  const { islemlerState } = useSelector((state) => state);
  const [hasta, setHasta] = useState(null);
  const [hastaIslemleri, setHastaIslemleri] = useState([]);
  const [buttonHandler, setButtonHandler] = useState(false);
  const [hastaIslem, setHastaIslem] = useState("");

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
    <h1>Loading...</h1>;
    return;
  }

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center my-4">
        <div
          className="border rounded p-4"
          style={{
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

      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{ border: "1px solid", margin: "20px" }}
                variant="raised"
                {...bindTrigger(popupState)}
              >
                Hasta İşlemlerİnİ Göster
              </Button>
            </div>
            <Menu
              {...bindMenu(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
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
                              <>
                                <div>{hastaIslemi.uygulananTedavi}</div>
                                <div>{hastaIslemi.yazilanIlaclar}</div>
                              </>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
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
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </h4>
                );
              })}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>

      <AddTedaviModal
        open={buttonHandler}
        handleClose={() => setButtonHandler(false)}
        hastaIslemi={hastaIslem}
      />
    </div>
  );
};

export default Detaylar;
