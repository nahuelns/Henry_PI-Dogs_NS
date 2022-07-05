import React from "react";
import './styles/Paginado.css'


export default function Paginado ({dogsxPage, allDogs, pagina}){
    const pageNumbers =[]

    for (let i = 0; i < Math.ceil(allDogs/dogsxPage); i++) {
        pageNumbers.push(i+1)
        }
    return(
        <div id='paginado'>
            <br/>
                { pageNumbers && pageNumbers.map(number =>(
                   
                    <button onClick={()=> pagina(number)} id='btnPag'>{number}</button>
                
                ))}
            
        </div>
    )
}