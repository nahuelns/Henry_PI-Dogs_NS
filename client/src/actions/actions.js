import axios from 'axios';


export function getAllDogs() {
    return async function (dispatch) {

        const dogsApi = await axios.get('http://localhost:3001/dogs')
        return dispatch(
            {
                type: 'GET_ALL_DOGS',
                payload: dogsApi.data
            })
    }
}

export function getAllTemperament() {
    return async function (dispatch) {

        const dogsApi = await axios.get('http://localhost:3001/temperament')
        return dispatch(
            {
                type: 'GET_ALL_TEMPERAMENT',
                payload: dogsApi.data
            })
    }
}

export function filterByTemperament(payload) {

    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload,
    }
}

export function filterDogsByOrigin(payload) {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function orderByAlphabet(payload) {

    return {
        type: 'ORDER_BY_ALPHABET',
        payload,
    }
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function searchByName(name) {

    return async function (dispatch) {
        try {
            var dogsByName = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        return dispatch(
            {
                type: 'GET_BY_NAME',
                payload: dogsByName.data,
            })
        } catch (error) {
            console.log(error)
        }
        
    }
}


export function getDogDetail(id) {

    return async function (dispatch) {

        var dogById = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch(
            {
                type: 'GET_DETAIL',
                payload: dogById.data,
            })
    }
}


export function createDogs(payload) {

    return async function (dispatch) {
        try {

            var dogsCreate = await axios.post(`http://localhost:3001/dogs`, payload)
            return dogsCreate;


        } catch (error) {
            console.log(error)
        }

    }}


    