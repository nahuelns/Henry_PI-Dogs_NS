import React from "react";
import "./styles/DogDetail.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail, deleteDog } from "../actions/actions";
import { Link, useHistory } from "react-router-dom";
import imagDogDefault from '../images/dogDefault.jpg';
import temperamentCard from "../function/funcionTemp";

export default function Detail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogDetail(id));
}, [dispatch, id])

  const dogAllDetail = useSelector((state) => state.dogDetail);

  function handleDelete(e) {
    if (id.length > 5) {
        e.preventDefault()
        dispatch(deleteDog(id))
        alert('Raza eliminada')
        history.push('/home')
    }else{
        alert('Solo podemos eliminar las razas creadas por usted.')
    }
}
  console.log(dogAllDetail);

  return (
    <div id="cardDetail">
      <h1 id="mainTittle">{dogAllDetail.name}</h1>
      {dogAllDetail.image ?  <img src={dogAllDetail.image} alt="imagen del dog" id="imgDetail" /> : <img id='imgDetail'src={imagDogDefault} alt= 'dogImg'/>}
      
      <div>
        {dogAllDetail.temperaments ? <p>Temperaments: {temperamentCard(dogAllDetail.temperaments)}</p>:<p>Temperaments not found</p>}
        <p>Height max: {dogAllDetail.heightMax}</p>
        <p>Height min: {dogAllDetail.heightMin}</p>
        <p>Weight max: {dogAllDetail.weightMax}</p>
        <p>Weight min: {dogAllDetail.weightMin}</p>
        <p>Life expectancy in years: {dogAllDetail.life_span_min} - {dogAllDetail.life_span_max}</p>
      </div>
      <Link to="/home">
       <button className="btnDetail" onClick={(e) => handleDelete(e)}>Borrar</button> 
        <button className='btnDetail'>Back</button>
      </Link>
    </div>
  );
} 
