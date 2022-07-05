import React from 'react';
import './styles/Dog.css'
import functionTemp from '../function/funcionTemp';
import imagDogDefault from '../images/dogDefault.jpg';

export default function Dog({name, image, temperaments, weightMin, weightMax}){
    return(

        <div id='card'>
            <h1 id='tittleCard'>{name}</h1>
            {image ?  <img id='imgCard'src= {image} alt= 'dogImg'/> : <img id='imgCard'src={imagDogDefault} alt= 'dogImg'/>}
            {temperaments ? <h4 id='h4'>Temperament: {functionTemp(temperaments)}</h4> : <h4>Not temperament found</h4>}
            <h4 id='h4'>Peso min: {weightMin} - Peso Max: {weightMax}</h4>
        </div>


    )
}