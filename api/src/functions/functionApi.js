require('dotenv').config()
const axios = require('axios')
const { YOUR_API_KEY } = process.env


const getAllDogsApi = async (name) => {

    try {
        if (!name) {
            let allDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
            let allDogsFilter = allDogs.data.map((e) => ({

                id: e.id,
                name: e.name,
                image: e.image.url,
                temperaments: e.temperament,
                heightMin: e.height.metric.split(' - ')[0],
                heightMax: e.height.metric.split(' - ')[1],
                weightMin: e.weight.metric.split(' - ')[0],
                weightMax: parseInt(e.weight.metric.split(' - ')[1]),
                life_span_min: e.life_span.split(' - ')[0],
                life_span_max: e.life_span.split(' - ')[1],
                
            }))
            return allDogsFilter;

        } else {
            let allDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
            let theDogs = allDogs.data.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
            let theDogsFilter = theDogs.map((e) =>({

                id: e.id,
                name: e.name,
                image: e.image.url,
                temperaments: e.temperament,
                heightMin: e.height.metric.split(' - ')[0],
                heightMax: e.height.metric.split(' - ')[1],
                weightMin: e.weight.metric.split(' - ')[0],
                weightMax: e.weight.metric.split(' - ')[1],
                life_span_min: e.life_span.split(' - ')[0],
                life_span_max: e.life_span.split(' - ')[1],


            }))

    
            return theDogsFilter;
                 
        }

       

    } catch (error) {
        console.log(error)
    }

} 


module.exports = getAllDogsApi;