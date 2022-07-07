import React from "react";
import './styles/SearchBar.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../actions/actions";


export default function SearchDog() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleOnChange(e) {
    e.preventDefault();
    setName(e.target.value);  
  }
  

  function onSubmit(e) {
    e.preventDefault();
    dispatch(searchByName(name));
  }

  
  return (
    <div className="search">
        <input className="input" type="text" placeholder="Encuentra tu dog" onChange={(e)=>handleOnChange(e)}  />
        <button className="button"  type="submit" onClick={(e)=> onSubmit(e)}>Buscar</button>
    </div>
  );
}




