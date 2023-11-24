const {Pig} = require("../models")
const isMyPig = (req,res,next)=>{
   Pig.findByPk(req.params.id).then(foundPig=>{
    if(foundPig.FarmerId!==req.session.user.id){
        return res.status(401).json({msg:"not your pig!"})
    }
    next()
   })
}

module.exports = isMyPig