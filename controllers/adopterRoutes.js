const express = require('express');
const router = express.Router();
const {Adopter,Pig} = require('../models');
//get all
router.get("/",(req,res)=>{
    Adopter.findAll().then(dbAdopters=>{
        res.json(dbAdopters)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})
//get one
router.get("/:id",(req,res)=>{
    Adopter.findByPk(req.params.id,{
        include:[Pig]
    }).then(dbAdopter=>{
        if(!dbAdopter){
            return res.status(404).json({msg:"no such adopter!"})
        }
        res.json(dbAdopter)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

//create
router.post("/",(req,res)=>{
    Adopter.create({
        email:req.body.email,
        displayName:req.body.displayName,
        password:req.body.password,
        lat:req.body.lat,
        lng:req.body.lng
    }).then(newAdopter=>{
        res.json(newAdopter)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

module.exports = router;