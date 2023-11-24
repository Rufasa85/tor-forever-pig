const withFarmerAuth = (req,res,next)=>{
    if(!req.session.user?.id||!req.session.user?.isFarmer){
        return res.status(401).json({msg:"login as a farmer!"})
    }
    next()
}

module.exports = withFarmerAuth