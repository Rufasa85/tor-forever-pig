const express = require('express');
const router = express.Router();
const {Pig,Trait} = require('../models');
//get all
router.get("/",(req,res)=>{
    Trait.findAll().then(dbTraits=>{
        res.json(dbTraits)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})
//get one
router.get("/:id",(req,res)=>{
    Trait.findByPk(req.params.id,{
        include:[Pig]
    }).then(dbTrait=>{
        if(!dbTrait){
            return res.status(404).json({msg:"no such Trait!"})
        }
        res.json(dbTrait)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

//create
router.post("/",(req,res)=>{
    Trait.create({
        name:req.body.name
    }).then(newTrait=>{
        res.json(newTrait)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

//edit
router.put("/:id",(req,res)=>{
    Trait.update({
        name:req.body.name
    },{
        where:{
            id:req.params.id
        }
    }).then(editTrait=>{
        console.log(editTrait)
        if(!editTrait[0]){
            return res.status(404).json({msg:"no such Trait!"})
        }
        res.json(editTrait)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})

//delete
router.delete("/:id",(req,res)=>{
    Trait.destroy({
        where:{
            id:req.params.id
        }
    }).then(delTrait=>{
        if(!delTrait){
            return res.status(404).json({msg:"no such Trait!"})
        }
        res.json(delTrait)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp womp",err})
    })
})


module.exports = router;