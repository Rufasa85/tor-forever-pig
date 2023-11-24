const Farmer = require("./Farmer");
const Adopter = require("./Adopter");
const Pig = require("./Pig");
const Trait = require("./Trait");

Pig.belongsTo(Farmer,{
    onDelete:"CASCADE"
})
Farmer.hasMany(Pig);

Pig.belongsTo(Adopter,{
    onDelete:"SET NULL"
})
Adopter.hasMany(Pig);

Trait.belongsToMany(Pig,{
    through:"PigsTraits"
})
Pig.belongsToMany(Trait,{
    through:"PigsTraits"
})



module.exports = {
    Farmer,
    Adopter,
    Pig,
    Trait,
}