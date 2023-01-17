import React from "react";
import { Route } from "react-router-dom";
import Nav from "./componentes/Nav.jsx";
import NavCreate from "./componentes/NavCreate";
import Catalogo from "./componentes/Catalogo.jsx";
import Dog from "./componentes/Dog.jsx";
import FilterDogs from "./componentes/FilterDogs.jsx";
import Searched from "./componentes/SearchedDogs.jsx";
import LandingPage from "./componentes/LandingPage.jsx";
import CreateDog from "./componentes/CreateDog";

import "./App.css";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/home" render={() => <Nav onSearch="onSearch" />} />
      <Route path="/dogs" render={() => <Nav onSearch="onSearch" />} />
      <Route path="/admin/dogs" render={() => <NavCreate />} />
      <div className="home">
        <div className="home">
          <Route exact path="/home" component={FilterDogs} />
        </div>
        <Route exact path="/home" component={Catalogo} />
      </div>

      <Route exact path="/" component={LandingPage} />

      <Route exact path="/dogs/:id" component={Dog} />

      <Route path="/dogs/search/:id" component={Searched} />
      <Route exact path="/admin/dogs" component={CreateDog} />
    </div>
  );
}

export default App;
