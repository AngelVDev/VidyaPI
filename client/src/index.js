import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import Landing from "./Components/Landing";
import Home from "./Components/Home";
import Creator from "./Components/Creator";
import Details from "./Components/Details";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/home/:id" element={<Details />}/>
          <Route path="/create" element={<Creator />} />
        </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);