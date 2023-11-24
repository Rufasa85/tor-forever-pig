const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class Adopter extends Model {}

Adopter.init({
    // add properites here, ex:
    email: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true
    },
    displayName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    },
    lat:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
    lng:{
        type:DataTypes.FLOAT,
        allowNull:false,
    }
},{
    sequelize,
    hooks:{
        beforeCreate: adpoterObj=>{
            adpoterObj.password = bcrypt.hashSync(adpoterObj.password,10);
            return adpoterObj
        }
    }
});

module.exports=Adopter