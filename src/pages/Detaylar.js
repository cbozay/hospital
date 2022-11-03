import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

import AddTedaviModal from "../components/AddTedaviModal";

const Detaylar = () => {
  const { hastaDetayId } = useParams();
  const [hasta, setHasta] = useState(null);
  // const [islemler, setIslemler] = useState(null);
  const [hastaIslemleri, setHastaIslemleri] = useState([]);
  const [buttonHandler, setButtonHandler] = useState(false);
  const [hastaIslem, setHastaIslem] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3004/hastalar/${hastaDetayId}`)
      .then((resHasta) => {
        setHasta(resHasta.data);
        axios
          .get("http://localhost:3004/islemler")
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
  }, [buttonHandler]);

  // console.log("hastaIslemleri", hastaIslemleri);

  // hasta.islemIds.map((hastaIslemId) => {
  //   const searchedIslemId = islemler.find((islem) => islem.id === hastaIslemId);
  //   console.log(">>> searchedIslemId", searchedIslemId);
  //   // setSearchedIslemId([...searchedIslemId]);
  // });
  // console.log(hasta.islemIds);

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
      <hr />

      {hastaIslemleri.map((hastaIslemi, index) => {
        // console.log("hastaIslemi", hastaIslemi);
        // console.log("hastaIslemleri", hastaIslemleri);
        return (
          <h4 key={index} className="d-flex justify-content-center">
            <div className="d-flex border" style={{ width: "500px" }}>
              <div style={{ fontWeight: "bold", color: "red" }}>
                {index + 1 + "-"}{" "}
              </div>

              <div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Hasta Şikayet: </span>
                  <span>{hastaIslemi.sikayet}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Uygulanan Tedavi: </span>
                  {hastaIslemi.uygulananTedavi
                    ? hastaIslemi.uygulananTedavi
                    : "-"}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Yazılan İlaçlar: </span>
                  {hastaIslemi.yazilanIlaclar.length
                    ? hastaIslemi.yazilanIlaclar + ","
                    : "-"}
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

      <AddTedaviModal
        open={buttonHandler}
        handleClose={() => setButtonHandler(false)}
        hastaIslemi={hastaIslem}
        setButtonHandler={() => setButtonHandler(false)}
      />

      {/* {hasta.islemIds.map((islemId) => {
        const searchedIslemId = islemler.find((item) => item.id === islemId);
        console.log(">>searchedIslemId  ", searchedIslemId);
        return <div key={islemId}></div>;
      })} */}
    </div>
  );
};

export default Detaylar;
