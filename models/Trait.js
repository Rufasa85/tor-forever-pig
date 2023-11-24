const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trait extends Model {}

Trait.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         unique:true,
         allowNull:false
    }
},{
    sequelize
});

module.exports=Trait