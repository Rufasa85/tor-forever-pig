const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class Farmer extends Model {}

Farmer.init({
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
        beforeCreate: farmerObj=>{
            farmerObj.password = bcrypt.hashSync(farmerObj.password,10);
            return farmerObj
        }
    }
});

module.exports=Farmer