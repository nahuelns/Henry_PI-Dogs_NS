import React from "react";
import "./styles/DogDetail.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../actions/actions";
import { Link } from "react-router-dom";
import imagDogDefault from '../images/dogDefault.jpg';
import temperamentCard from "../function/funcionTemp";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);
  

  const dogAllDetail = useSelector((state) => state.dogDetail);

  console.log(dogAllDetail);

  return (
    <div id="cardDetail">
      <h1 id="mainTittle">{dogAllDetail.name}</h1>
      {dogAllDetail.image ?  <img src={dogAllDetail.image} alt="imagen del dog" id="imgDetail" /> : <img id='imgDetail'src={imagDogDefault} alt= 'dogImg'/>}
      
      <div>
        {dogAllDetail.temperaments ? <p>Temperaments: {temperamentCard(dogAllDetail.temperaments)}</p>:<p>Temperaments not found</p>}
        <p>Altura max: {dogAllDetail.heightMax}</p>
        <p>Altura min: {dogAllDetail.heightMin}</p>
        <p>Peso max: {dogAllDetail.weightMax}</p>
        <p>Peso min: {dogAllDetail.weightMin}</p>
        <p>Promedio de vida: {dogAllDetail.life_span}</p>
      </div>
      <Link to="/home">
        <button id='btn1'>Back</button>
      </Link>
    </div>
  );
}
