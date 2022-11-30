import React from "react";
import { useParams } from "react-router-dom";

const RandevuDetay = () => {
  const params = useParams();
  console.log(params);

  return <div>RandevuDetay</div>;
};

export default RandevuDetay;
