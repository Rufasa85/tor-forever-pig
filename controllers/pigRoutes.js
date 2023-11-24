const express = require('express');
const router = express.Router();
const withFarmerAuth = require("../middleware/withFarmerAuth")
const withAdopterAuth = require("../middleware/withAdopterAuth")
const isMyPig = require("../middleware/isMyPig")
const isMyAdoptedPig = require("../middleware/isMyAdoptedPig")
const {Adopter,Pig,Farmer,Trait} = require('../models');
//get all
router.get("/",(req,res)=>{
    Pig.findAll().then(dbPigs=>{
        res.json(dbPigs)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})
//get one
router.get("/:id",(req,res)=>{
    Pig.findByPk(req.params.id,{
        include:[Farmer,Adopter,Trait]
    }).then(dbPig=>{
        if(!dbPig){
            return res.status(404).json({msg:"no such pig!"})
        }
        res.json(dbPig)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

//create
router.post("/",withFarmerAuth,(req,res)=>{
        Pig.create({
            name:req.body.name,
            image:req.body.image,
            isAdoptable:req.body.isAdoptable,
            FarmerId:req.session.user.id
        }).then(newPig=>{
            res.json(newPig)
        }).catch(err=>{
            res.status(500).json({msg:"womp womp womp",err})
        })
    })

//adopt
router.put("/:id/adopt",withAdopterAuth,(req,res)=>{
    //TODO: make sure pig isnt adopted
    Pig.update({
        isAdoptable:false,
        AdopterId:req.session.user.id
    },{
        where:{
            id:req.params.id,
            isAdoptable:true,
            AdopterId:null
        }
    }).then(editPig=>{
        console.log(editPig)
        if(!editPig[0]){
            return res.status(404).json({msg:"no such pig!"})
        }
        res.json(editPig)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})
//return
router.put("/:id/return",withAdopterAuth,isMyAdoptedPig,(req,res)=>{
    Pig.update({
        isAdoptable:true,
        AdopterId:null
    },{
        where:{
            id:req.params.id
        }
    }).then(editPig=>{
        console.log(editPig)
        if(!editPig[0]){
            return res.status(404).json({msg:"no such pig!"})
        }
        res.json(editPig)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})
//edit
router.put("/:id",withFarmerAuth,isMyPig,(req,res)=>{
    Pig.update({
        name:req.body.name,
        image:req.body.image,
        isAdoptable:req.body.isAdoptable,
        FarmerId:req.body.FarmerId,
        AdopterId:req.body.AdopterId
    },{
        where:{
            id:req.params.id
        }
    }).then(editPig=>{
        console.log(editPig)
        if(!editPig[0]){
            return res.status(404).json({msg:"no such pig!"})
        }
        res.json(editPig)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

//delete
router.delete("/:id",withFarmerAuth,isMyPig,(req,res)=>{
    Pig.destroy({
        where:{
            id:req.params.id
        }
    }).then(delPig=>{
        if(!delPig){
            return res.status(404).json({msg:"no such pig!"})
        }
        res.json(delPig)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

//add trait
router.post("/:id/addtrait/:traitId",withFarmerAuth,isMyPig,(req,res)=>{
    Pig.findByPk(req.params.id).then(foundPig=>{
        if(!foundPig){
            return res.status(404).json({msg:"no such pig!"})
        }
        foundPig.addTrait(req.params.traitId).then(data=>{
            res.json(data);
        }).catch(err=>{
            res.status(500).json({msg:"womp womp womp",err})
        })
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

//removeTrait
router.delete("/:id/removetrait/:traitId",withFarmerAuth,isMyPig,(req,res)=>{
    Pig.findByPk(req.params.id).then(foundPig=>{
        if(!foundPig){
            return res.status(404).json({msg:"no such pig!"})
        }
        foundPig.removeTrait(req.params.traitId).then(data=>{
            res.json(data);
        }).catch(err=>{
            res.status(500).json({msg:"womp womp womp",err})
        })
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

module.exports = router;