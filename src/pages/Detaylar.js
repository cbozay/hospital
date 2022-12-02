import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { api } from "../api/api";
import { url } from "../api/url";
import AddTedaviModal from "../components/AddTedaviModal";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
        <div className="border border-warning rounded p-4">
          <h3>
            <span style={{ fontWeight: "bold" }}>Hasta Kayıt No: </span>
            {hasta.id}
          </h3>
          <h3>
            <span style={{ fontWeight: "bold" }}>Hasta Adı Soyadı: </span>
            {hasta.name} {hasta.surname}
          </h3>

          <h3>
            {" "}
            <span style={{ fontWeight: "bold" }}>Hasta Telefon No: </span>
            {hasta.phone}
          </h3>
        </div>
      </div>

      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" {...bindTrigger(popupState)}>
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
                    <div className="d-flex " style={{ width: "500px" }}>
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "red",
                          marginLeft: "20px",
                        }}
                      >
                        {index + 1 + "-"}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",

                          width: "100%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontWeight: "bold",
                              borderBottom: "1px solid",
                            }}
                          >
                            Hasta Şikayet:
                          </div>
                          <div
                            style={{
                              fontWeight: "bold",
                              borderBottom: "1px solid",
                            }}
                          >
                            Uygulanan Tedavi:
                          </div>
                          <div
                            style={{
                              fontWeight: "bold",
                              borderBottom: "1px solid",
                            }}
                          >
                            Yazılan İlaçlar:
                          </div>
                        </div>

                        <div>
                          <div style={{ fontWeight: "normal" }}>
                            {" "}
                            {hastaIslemi.sikayet}
                          </div>

                          <div style={{ fontWeight: "normal" }}>
                            {" "}
                            {hastaIslemi.uygulananTedavi
                              ? hastaIslemi.uygulananTedavi
                              : "-"}
                          </div>

                          <div style={{ fontWeight: "normal" }}>
                            {" "}
                            {hastaIslemi.yazilanIlaclar.length
                              ? hastaIslemi.yazilanIlaclar
                              : "-"}
                          </div>
                        </div>
                        {hastaIslemi.uygulananTedavi ||
                        hastaIslemi.yazilanIlaclar.length ? (
                          ""
                        ) : (
                          <button
                            onClick={() => {
                              setButtonHandler(true);
                              setHastaIslem(hastaIslemi);
                            }}
                            style={{ fontSize: "15px" }}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Tedavi & İlaç Ekle
                          </button>
                        )}
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
