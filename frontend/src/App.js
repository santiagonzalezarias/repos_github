import React, {useEffect, useState} from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Router from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";

function App() {
  const [login, setLogin] = useState(true);

  useEffect(() =>{
    if(window.location.pathname === "/") setLogin(true)
    else setLogin(false)
  }, [login])

  return (
    <div className="App">
      <BrowserRouter>
      {!login && (
        <Nav />
      )}
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
