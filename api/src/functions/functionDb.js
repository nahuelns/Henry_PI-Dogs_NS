require('dotenv').config()
const { Race, Temperament } = require('../db')
const {Op} = require ('sequelize')



const getAllDogsDb = async (name) => {

    try {
        if (!name) {
            return await Race.findAll({
                include: { model: Temperament, attributes: ['name'], through: { attributes: [] } }
            })
        }
        else{

            return await Race.findAll({
      
                where:{
                   name:{[Op.iLike]:`%${name}%`}
                },
      
            include:{
                model:Temperament,
                attributes:['name'],
                through:{
                    attributes:[]
                } 
            },
           })
      
          }





    } catch (error) {
        console.log(error)
    }

}

module.exports = getAllDogsDb;