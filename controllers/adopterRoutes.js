const express = require('express');
const bcrypt = require("bcrypt");
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
        req.session.user={
            id:newAdopter.id,
            isFarmer:farmer
        }
        res.json(newAdopter)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})
router.post("/login",(req,res)=>{
    Adopter.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundAdopter=>{
        if(!foundAdopter){
            return res.status(401).json({
                msg:"Invalid login credentials"
            })
        }
        else if(!bcrypt.compareSync(req.body.password,foundAdopter.password)){
            return res.status(401).json({
                msg:"Invalid login credentials"
            })
        }
        req.session.user = {
            id:foundAdopter.id,
            isFarmer:false
        }
        res.json(foundAdopter)
    }).catch(err=>{
        console.log('err: ',err)
        res.status(500).json({msg:"womp womp womp",err})
    })
})

router.delete("/logout",(req,res)=>{
    req.session.destroy();
    res.json({msg:"logged out!"})
})

module.exports = router;