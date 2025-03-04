const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

const MockPlaces = [
    {
        id: "p1",
        title: "Mock Place",
        description: "Mock Place Description",
        location: {
            lat: "42.35588",
            long: "40.35588",
        },
        address: "Mock address",
        creator: "u1",
    },
];
const getAllPlaces = (req, res, next) => {
    return res.json(MockPlaces)
}
const getPlaceById = (req, res, next) => {
    const place = MockPlaces.find((p) => p.id === req.params.pid);
    if (!place) {
        return next(new HttpError("No place found for the provided ID", 404));
    }
    res.json({ place });
};

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }
    MockPlaces.push(createdPlace);
    if (!createdPlace) {
        return next(new HttpError("No place to be added", 404));
    }
    res.status(201).json({ place: createdPlace });
}

const getPlacesByUserId = (req, res, next) => {
    const userID = req.params.uid;
    const places = MockPlaces.filter((p) => p.creator === userID);
    if (!places) {
        return next(new HttpError("No place found for the provided user ID", 404));
    }
    res.json({ places });
};

const updatePlaceByPlaceId = (req, res, next) => {
    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = { ...MockPlaces.find(p => p.id === placeId) }
    const updatedPlaceIndex = MockPlaces.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;
    MockPlaces[updatedPlaceIndex] = updatedPlace;

    res.status(200).json({ place: updatedPlace });
}

const deletePlaceByPlaceId = (req, res, next) => {
    const placeId = req.params.pid;
    const places = MockPlaces.filter(p => p.id !== placeId);

    res.status(200).json(places)
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.getAllPlaces = getAllPlaces;
exports.updatePlaceByPlaceId = updatePlaceByPlaceId;
exports.deletePlaceByPlaceId = deletePlaceByPlaceId;