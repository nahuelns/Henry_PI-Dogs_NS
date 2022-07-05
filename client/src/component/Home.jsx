import React from "react";
import "./styles/Home.css";
import "./styles/Nav.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import Dog from "./Dog";

import {
  getAllDogs,
  getAllTemperament,
  filterByTemperament,
  filterDogsByOrigin,
  orderByAlphabet,
  orderByWeight,
} from "../actions/actions";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.allTemperament);

  //-------- Paginado ----------//

  const [order, setOrder] = useState("");

  const [page, setPage] = useState(1);
  const [dogsxPage, setDogsxPage] = useState(12);
  const indice = page * dogsxPage;

  const indiceFinal = indice - dogsxPage;

  const currentPage = allDogs.slice(indiceFinal, indice);

  const pagina = (numPage) => {
    setPage(numPage);
  };

  //----------------------------//

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperament());
  }, [dispatch]);

  function handleFilterTypes(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }

  function handleFilterOrigin(e) {
    e.preventDefault();
    dispatch(filterDogsByOrigin(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }

  function handleSortByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }

  function handleOrder(e) {
    e.preventDefault();
    dispatch(orderByAlphabet(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }
  return (
    <div>
      <nav id="nav">
        <h1 id="tittleHome">The Dog's World</h1>
        <ul>
          <li>
            <Link to="/dogs">
              <button id="crear">Crear Perro</button>
            </Link>
          </li>
          <li>
            <select
              onChange={(e) => {
                handleFilterTypes(e);
              }}
              className="filNav"
            >
              <option value={"all"}>All Teperaments</option>
              {allTemperaments?.map((e) => {
                return <option value={e.name}>{e.name}</option>;
              })}
            </select>
          </li>
          <li>
            <select
              key="selectOrder"
              onChange={(e) => handleOrder(e)}
              className="filNav"
            >
              <option value={"allApi"}>Order</option>
              <option value={"des"}>Descendentemente</option>
              <option value={"asc"}>Ascendentemente</option>
            </select>
          </li>
          <li>
            <select onChange={(e) => handleSortByWeight(e)} className="filNav">
              <option value="selected" hidden>
                Ordenado por Peso
              </option>
              <option value="asc">Mas Livianos</option>
              <option value="desc">Mas Pesados</option>
            </select>
          </li>
          <li>
            <select onChange={(e) => handleFilterOrigin(e)} className="filNav">
              <option value="all">Mostrar por origen</option>
              <option value="api">DogsApi</option>
              <option value="created">DogsDb</option>
            </select>
          </li>
          <li>
            <SearchBar />
          </li>
        </ul>
        <div class="clearfix"></div>
      </nav>

      <Paginado
        dogsxPage={dogsxPage}
        allDogs={allDogs.length}
        pagina={pagina}
      />
      {currentPage.map((e) => {
        return (
          <div>
            <Link to={`/home/${e.id}`}>
              <Dog
                name={e.name}
                image={e.image}
                temperaments={e.temperaments}
                id={e.id}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
