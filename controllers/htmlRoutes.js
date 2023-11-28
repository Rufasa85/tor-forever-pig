const express = require("express");
const router = express.Router();
const { Adopter, Farmer, Pig, Trait } = require("../models");
function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

router.get("/", (req, res) => {
  Pig.findAll({
    where: {
      isAdoptable: true,
    },
    include: [Farmer, Trait],
  }).then((dbPigs) => {
    const hbsPigs = dbPigs.map((pig) => pig.toJSON());
    console.log("hbsPigs: ", hbsPigs);
    let isLoggedIn = false;
    if (req.session.user && req.session.user.isFarmer === false) {
      isLoggedIn = true;
    }
    if (isLoggedIn) {
      Adopter.findByPk(req.session.user.id).then((foundUser) => {
        const pigsWithDistance = hbsPigs.map((pig) => {
          let distanceToMe = distance(
            pig.Farmer.lat,
            pig.Farmer.lng,
            foundUser.lat,
            foundUser.lng,
            "M"
          );
          pig.distance = distanceToMe.toFixed(2);
          return pig;
        });
        pigsWithDistance.sort((a, b) => {
          if (parseFloat(a.distance) < parseFloat(b.distance)) {
            return -1;
          } else {
            return 1;
          }
        });
        res.render("home", {
          loggedIn: isLoggedIn,
          pigs: pigsWithDistance,
        });
      });
    } else {
      res.render("home", {
        loggedIn: isLoggedIn,
        pigs: hbsPigs,
      });
    }
  });
});

router.get("/profile", (req, res) => {
  if (!req.session.user || req.session.user.isFarmer) {
    res.redirect("/login");
  } else {
    Adopter.findByPk(req.session.user.id, {
      include: [
        {
          model: Pig,
          include: [Trait,Farmer],
        },
      ],
    }).then((foundUser) => {
      const hbsUser = foundUser.toJSON()
      Pig.findAll({
        where: {
          isAdoptable: true,
        },
        include: [Farmer, Trait],
      }).then((dbPigs) => {
        const hbsPigs = dbPigs.map((pig) => pig.toJSON());
        const pigsWithDistance = hbsPigs.map((pig) => {
          let distanceToMe = distance(
            pig.Farmer.lat,
            pig.Farmer.lng,
            foundUser.lat,
            foundUser.lng,
            "M"
          );
          pig.distance = distanceToMe.toFixed(2);
          return pig;
        });
        pigsWithDistance.sort((a, b) => {
          if (parseFloat(a.distance) < parseFloat(b.distance)) {
            return -1;
          } else {
            return 1;
          }
        });
      res.render("profile", {
        user:hbsUser,
        loggedIn: true,
        pigs:pigsWithDistance,
        userHasPigs: hbsUser.Pigs.length>0
      });
    })
    });
  }
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.render("auth", {
      isLogin: true,
      loggedIn: false,
    });
  }
});

router.get("/signup", (req, res) => {
  if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.render("auth", {
      isLogin: false,
      loggedIn: false,
    });
  }
});

module.exports = router;
