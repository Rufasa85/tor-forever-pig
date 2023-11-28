const sequelize = require("../config/connection");
const {Farmer,Adopter,Pig,Trait} = require("../models");

const farmerData = [
    {
        email:"oldmac@donald.com",
        displayName:"Old McDonald",
        password:"password",
        lat:47.62,
        lng:-122.34
    },
    {
        email:"Farmer@brown.com",
        displayName:"FarmerBrown",
        password:"wilburThePig",
        lat:40.70,
        lng:-74.01
    }
]
const adopterData = [
    {
        email:"joe@joe.joe",
        displayName:"PigFan123",
        password:"iLovePigs",
        lat:47.62,
        lng:-122.33
    },
    {
        email:"arra@arra.com",
        displayName:"OG_Pig_Fan",
        password:"yay4Piggies!",
        lat:47.62,
        lng:-122.33
    }
]
const pigData = [
    {
        name:"Wilbur",
        image:"https://www.thesprucepets.com/thmb/8k3tUWIxVq7kitw_u7F7H0bgR4k=/5317x0/filters:no_upscale():strip_icc()/piglet-56158469-5c8ba7dc46e0fb0001770031.jpg",
        FarmerId:1,
        AdopterId:2
    },
   
    {
        name:"Babe",
        image:"https://www.shutterstock.com/image-photo/portrait-pig-wearing-sunglasses-piglet-260nw-1786255211.jpg",
        FarmerId:1
    },
   
    {
        name:"Porky",
        image:"https://i.pinimg.com/736x/b2/6c/99/b26c998d89d23f06e315107f88927e9b.jpg",
        FarmerId:2
    },
   
]
const traitData = [
    {
        name:"good starter pig"
    },
    {
        name:"good with pets"
    },
    {
        name:"good with children"
    }
]

const seedMe = async()=>{
    await sequelize.sync({force:true});
    const dbFarms = await Farmer.bulkCreate(farmerData,{
        individualHooks:true
    });
    const dbAdopters = await Adopter.bulkCreate(adopterData,{
        individualHooks:true
    });
    const dbPigs = await Pig.bulkCreate(pigData);
    const dbTraits = await Trait.bulkCreate(traitData);
    await dbPigs[0].addTrait(1);
    await dbPigs[1].addTraits([1,3]);
    await dbTraits[1].addPigs([1,2])
    process.exit(0)
}

seedMe()