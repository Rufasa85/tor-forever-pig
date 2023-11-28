const express = require('express');
const router = express.Router();

const farmerRoutes = require("./farmerRoutes");
router.use("/api/farmers",farmerRoutes);

const adopterRoutes = require("./adopterRoutes");
router.use("/api/adopters",adopterRoutes);

const pigRoutes = require("./pigRoutes");
router.use("/api/pigs",pigRoutes);

const traitRoutes = require("./traitRoutes");
router.use("/api/traits",traitRoutes);

const htmlRoutes = require("./htmlRoutes");
router.use("/",htmlRoutes);

router.get("/readsessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;