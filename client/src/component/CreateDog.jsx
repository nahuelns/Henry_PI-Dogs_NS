import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDogs, getAllTemperament } from "../actions/actions";
import { useDispatch, useSelector } from 'react-redux'
import "./styles/DogCreate.css";


function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Raza es un campo obligatorio'
    }

    else if (!input.heightMin) {
        errors.heightMin = 'Altura min es un campo obligatorio'
    }

    else if (isNaN(parseInt(input.heightMin))) {
        errors.heightMin = 'El valor debe ser un numero'
    }

    else if (input.heightMin <= 0) {
        errors.heightMin = 'Altura min debe ser mayor que 0'
    }

    else if (!input.heightMax) {
        errors.heightMax = 'Altura max es un campo obligatorio'
    }

    else if (isNaN(parseInt(input.heightMax))) {
        errors.heightMax = 'El valor debe ser un numero'
    }

    else if (input.heightMax > 150) {
        errors.heightMax = 'Altura max debe ser < 150'
    }

    else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {
        errors.heightMin = 'Altura min debe ser menor que altura max'
    }

    else if (!input.weightMin) { errors.weightMin = 'Peso min es un campo obligatorio' }

    else if (isNaN(parseInt(input.weightMin))) {
        errors.weightMin = 'El valor debe ser un numero'
    }

    else if (input.weightMin <= 0) {
        errors.weightMin = 'Peso min debe ser mayor que 0'
    }

    else if (!input.weightMax) { errors.weightMax = 'Deberias especificar un peso maximo' }

    else if (isNaN(parseInt(input.weightMax))) {
        errors.weightMax = 'Peso max es un campo obligatorio'
    }

    else if (input.weightMax > 90) {
        errors.heightMax = 'Peso max debe ser < 90'
    }

    else if (parseInt(input.weightMin) >= parseInt(input.weightMax)) {
        errors.weightMin = 'Peso min debe ser menor que altura max'
    }

    else if (!input.life_span_min) {
        errors.life_span_min = 'Esperanza de vida min es un campo obligatorio'
    }

    else if (!input.life_span_max) {
        errors.life_span_max = 'Esperanza de vida max es un campo obligatorio'
    }

    else if (parseInt(input.life_span_min) >= parseInt(input.life_span_max)) {
        errors.life_span_min = 'Esperanza de vida min debe ser menor que Esperanza de vida max'
    }

    return errors
}

export default function CreateDog(){

    const dispatch = useDispatch();
    const history = useHistory();
    const allTemp = useSelector((state) => state.allTemperament)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span_min: '',
        life_span_max: '',
        image: '',
        temperaments: [],
    });

    useEffect(() => {
        dispatch(getAllTemperament())
    }, [dispatch])
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
    }

    function handleSelect(e) {
        
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            }) 
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!Object.getOwnPropertyNames(errors).length && input.name && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.life_span_min && input.life_span_max) {
            
            if (!input.image) {
                input.image = 'img';
            }
            dispatch(createDogs(input))
            alert('Se creo una nueva raza')
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                life_span_min: '',
                life_span_max: '',
                image: '',
                temperaments: [],
               
            })
            history.push('/home');
        } else {
            
            alert('Tu Dog no ha sido creado, revisa tu formulario.')
        }
    }
    function handleDelete (event) {
        setInput({
        ...input,
        temperaments: input.temperaments.filter(e => e !== event)
        })
  }

    return(

    <div className="createDog">
    
    <h1 className="title">Create your Dog</h1>
    <form onSubmit={e => handleSubmit(e)} id='form'>
        <ul>
            
            <li>
                <label>Race: </label>
                <input type="text" value={input.name} name='name' onChange={e => handleChange(e)}/>
                {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
            </li>

            <li>
                <label>Height min (Cm): </label>
                <input type="text" value={input.heightMin} name='heightMin' onChange={e => handleChange(e)}/>
                {errors.heightMin && (
                        <p className="error">{errors.heightMin}</p>
                    )}
            </li>

            <li>
                <label>Height max (Cm): </label>
                <input type="text"  value={input.heightMax} name='heightMax' onChange={e => handleChange(e)}/>
                {errors.heightMax && (
                        <p className="error">{errors.heightMax}</p>
                    )}
            </li>

            <li>
                <label>Weight min (Kg): </label>
                <input type="text" value={input.weightMin} name='weightMin' onChange={e => handleChange(e)}/>
                {errors.weightMin && (
                        <p className="error">{errors.weightMin}</p>
                    )}
            </li>

            <li>
                <label>Weight max (Kg): </label>
                <input type="text" value={input.weightMax} name='weightMax' onChange={e => handleChange(e)}/>
                {errors.weightMax && (
                        <p className="error">{errors.weightMax}</p>
                    )}
            </li>

            <li>
                <label>Life expectancy in years (min): </label>
                <input type="text" value={input.life_span_min} name='life_span_min' onChange={e => handleChange(e)}/>
                {errors.life_span_min && (
                        <p className="error">{errors.life_span_min}</p>
                    )}
            </li>

            <li>
                <label>Life expectancy in years (max): </label>
                <input type="text" value={input.life_span_max} name='life_span_max' onChange={e => handleChange(e)}/>
                {errors.life_span_max && (
                        <p className="error">{errors.life_span_max}</p>
                    )}
            </li>

            <li>
                <select onChange={e => handleSelect(e)} id="temp">
                    <option value='selected' hidden >Temperaments</option>
                    {allTemp?.sort(function (a, b) {
                        if (a.name < b.name) return -1
                        if (a.name > b.name) return 1
                        return 0
                    }).map(temp => {
                        return (
                            <option value={temp.name} key={temp.id}>{temp.name}</option>
                        )
                    })}
                </select>
            </li>
            
            <li>
            {input.temperaments.map(e =>
            <div>
              <h5>{e}
              <button onClick={()=>handleDelete(e)} className='btn3'>X</button>
              </h5>
            </div>
          )}
            </li>

        </ul>
        <div className="containerButton">
        <Link to='/home'><button className="btn1">Back</button></Link>
        <button type="submit" className="btn1" id='btnCrear'><strong>Crear</strong></button>
        </div>

    </form>
</div>
)

}