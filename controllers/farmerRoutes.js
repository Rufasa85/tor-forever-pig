const express = require('express');
const router = express.Router();
const {Farmer,Pig} = require('../models');
//get all
router.get("/",(req,res)=>{
    Farmer.findAll().then(dbFarmers=>{
        res.json(dbFarmers)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})
//get one
router.get("/:id",(req,res)=>{
    Farmer.findByPk(req.params.id,{
        include:[Pig]
    }).then(dbFarmer=>{
        if(!dbFarmer){
            return res.status(404).json({msg:"no such farmer!"})
        }
        res.json(dbFarmer)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

//create
router.post("/",(req,res)=>{
    Farmer.create({
        email:req.body.email,
        displayName:req.body.displayName,
        password:req.body.password,
        lat:req.body.lat,
        lng:req.body.lng
    }).then(newFarmer=>{
        res.json(newFarmer)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

module.exports = router;