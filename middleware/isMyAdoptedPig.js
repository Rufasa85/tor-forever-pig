const {Pig} = require("../models")
const isMyAdoptedPig = (req,res,next)=>{
   Pig.findByPk(req.params.id).then(foundPig=>{
    if(foundPig.AdopterId!==req.session.user.id){
        return res.status(401).json({msg:"not your pig!"})
    }
    next()
   })
}

module.exports = isMyAdoptedPig