import React from "react";
import './styles/Landing.css';
import { Link } from "react-router-dom";


export default function LandingPage(){
    return(
        <div className='landing'>
            <h1 className='tittle' >Welcome to the Dog's World</h1>
            <Link to='/home'>
                <button className='btn'>Ingresar</button>
            </Link>
        </div>
    )
}
