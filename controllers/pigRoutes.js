const express = require('express');
const router = express.Router();
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
router.post("/",(req,res)=>{
    Pig.create({
        name:req.body.name,
        image:req.body.image,
        isAdoptable:req.body.isAdoptable,
        FarmerId:req.body.FarmerId
    }).then(newPig=>{
        res.json(newPig)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

//edit
router.put("/:id",(req,res)=>{
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
router.delete("/:id",(req,res)=>{
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
router.post("/:pigId/addtrait/:traitId",(req,res)=>{
    Pig.findByPk(req.params.pigId).then(foundPig=>{
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
router.delete("/:pigId/removetrait/:traitId",(req,res)=>{
    Pig.findByPk(req.params.pigId).then(foundPig=>{
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