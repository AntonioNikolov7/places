const express = require("express");

const placesControllers = require('../controllers/places-controller');

const router = express.Router();

router.get('/', placesControllers.getAllPlaces)

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.post("/", placesControllers.createPlace);

router.patch("/:pid", placesControllers.updatePlaceByPlaceId)

router.delete('/:pid', placesControllers.deletePlaceByPlaceId)

module.exports = router;