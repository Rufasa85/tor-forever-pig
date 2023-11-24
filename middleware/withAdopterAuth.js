const withFarmerAuth = (req,res,next)=>{
    if(!req.session.user?.id||req.session.user?.isFarmer){
        return res.status(401).json({msg:"login as an adopter!"})
    }
    next()
}

module.exports = withFarmerAuth