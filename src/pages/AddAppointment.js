import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AddAppointment = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [complain, setComplain] = useState("");
  const [date, setDate] = useState("");
  const [patients, setPatients] = useState(null);
  const [hasPatient, setHasPatient] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3004/hastalar")
      .then((res) => setPatients(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      date === "" ||
      name === "" ||
      surname === "" ||
      phone === "" ||
      complain === ""
    ) {
      alert("Please fill all gap!");
      return;
    }

    if (phone.length !== 11) {
      alert("Please enter 11 character!");
      return;
    }

    if (hasPatient) {
      const newProcess = {
        id: String(new Date().getTime()),
        sikayet: complain,
        uygulananTedavi: "",
        yazilanIlaclar: [],
      };

      const newAppointment = {
        id: String(new Date().getTime() + 1),
        date: date,
        hastaId: hasPatient.id,
      };

      const updatedPatient = {
        ...hasPatient,
        islemIds: [...hasPatient.islemIds, newProcess.id],
      };

      axios
        .post("http://localhost:3004/islemler", newProcess)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      axios
        .post("http://localhost:3004/randevular", newAppointment)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      axios
        .put(`http://localhost:3004/hastalar/${hasPatient.id}`, updatedPatient)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      navigate("/");
    } else {
      const newPatient = {
        id: String(new Date().getTime()),
        name: name,
        surname: surname,
        phone: phone,
        islemIds: [String(new Date().getTime() + 1)],
      };

      const newAppointment = {
        id: String(new Date().getTime() + 2),
        date: date,
        hastaId: newPatient.id,
      };

      const newProcess = {
        id: newPatient.islemIds,
        sikayet: complain,
        uygulananTedavi: "",
        yazilacakIlaclar: [],
      };

      axios
        .post("http://localhost:3004/hastalar", newPatient)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      axios
        .post("http://localhost:3004/randevular", newAppointment)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      axios
        .post("http://localhost:3004/islemler", newProcess)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      navigate("/");
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    const searchedPatient = patients.find(
      (patient) => patient.phone === event.target.value
    );
    if (searchedPatient !== undefined) {
      setName(searchedPatient.name);
      setSurname(searchedPatient.surname);
      setHasPatient(searchedPatient);
    } else {
      setName("");
      setSurname("");
      setHasPatient(false);
    }
  };

  if (patients === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          <TextField
            style={{ width: "500px" }}
            id="outlined-basic"
            label=""
            variant="outlined"
            type="datetime-local"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          <TextField
            style={{ width: "500px" }}
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            type="number"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          <TextField
            style={{ width: "500px" }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="text"
            disabled={hasPatient}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          <TextField
            style={{ width: "500px" }}
            id="outlined-basic"
            label="Surname"
            variant="outlined"
            type="text"
            disabled={hasPatient}
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          <TextField
            style={{ width: "500px" }}
            id="outlined-basic"
            label="Complain"
            variant="outlined"
            type="text"
            value={complain}
            onChange={(event) => setComplain(event.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          <Button type="submit" variant="outlined">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAppointment;
