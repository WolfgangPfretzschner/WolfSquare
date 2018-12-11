import React from "react";
import ReactDOM from "react-dom";
import http from "http";
// import './assets/css/brooke.css';
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
   <Router>
      <App />
   </Router>,
   document.getElementById("root")
);
registerServiceWorker();


