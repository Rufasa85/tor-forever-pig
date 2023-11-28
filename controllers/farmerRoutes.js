const express = require('express');
const bcrypt = require("bcrypt")
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
    //TODO: ensure user isnt logged in
    Farmer.create({
        email:req.body.email,
        displayName:req.body.displayName,
        password:req.body.password,
        lat:req.body.lat,
        lng:req.body.lng
    }).then(newFarmer=>{
        req.session.user = {
            id:newFarmer.id,
            isFarmer:true
        }
        res.json(newFarmer)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

router.post("/login",(req,res)=>{
    //TODO: ensure user isnt logged in
    Farmer.findOne({
       where:{
        email:req.body.email
       }
    }).then(foundFarmer=>{
        if(!foundFarmer){
            return res.status(401).json({
                msg:"Invalid login credentials"
            })
        }
        else if(!bcrypt.compareSync(req.body.password,foundFarmer.password)){
            return res.status(401).json({
                msg:"Invalid login credentials"
            })
        }
        req.session.user = {
            id:foundFarmer.id,
            isFarmer:true
        }
        res.json(foundFarmer)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

router.delete("/logout",(req,res)=>{
    req.session.destroy();
    res.json({msg:"logged out!"})
})

module.exports = router;