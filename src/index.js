import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import animation from "./assets/styles/animation.mp4";
import "./assets/styles/generalStyle.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="main">
        <video src={animation} autoPlay loop muted />
        <div className="content">
          <App />
        </div>
      </div>
    </Provider>
  </React.StrictMode>
);
