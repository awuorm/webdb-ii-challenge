const express = require("express");
const router = express.Router();
const db = require("./db-config");

router.get("/:id", validateId, validateCar, handleGetCarById);
router.put("/:id", validateId, validateCar, handleCarPut);
router.delete("/:id", validateId, validateCar, handleCarDelete);
router.get("/", handleAllCarsGet);
router.post("/", handleCarPost);

function handleCarDelete(req, res) {
  db("cars")
    .where({ id: req.params.id })
    .delete()
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function handleCarPut(req, res) {
  const car = {
    VIN: req.body.VIN,
    make: req.body.make,
    model: req.body.model,
    mileage: req.body.mileage,
    transmissionType: req.body.transmissionType,
    titleStatus: req.body.titleStatus
  };
  db("cars")
    .where({ id: req.params.id })
    .update(car)
    .then(data => {
      console.table(data);
      res.status(201).json(car);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function handleCarPost(req, res) {
  const car = {
    VIN: req.body.VIN,
    make: req.body.make,
    model: req.body.model,
    mileage: req.body.mileage,
    transmissionType: req.body.transmissionType,
    titleStatus: req.body.titleStatus
  };
  db("cars")
    .insert(car)
    .then(data => {
      console.table(data);
      res.status(201).json(car);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function handleGetCarById(req, res) {
  res.status(200).json(req.car);
  console.table(req.data);
}

function handleAllCarsGet(req, res) {
  db("cars")
    .then(data => {
      console.table(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

//custom middlewares

function validateId(req, res, next) {
  const { id } = req.params;
  if (Number(id)) {
    next();
  } else {
    res.status(400).json({ errorMessage: "please provide a valid Id" });
  }
}

function validateCar(req, res, next) {
  db("cars")
    .where({ id: req.params.id })
    .then(data => {
      if (data.length === 0) {
        res.status(400).json({
          errorMessage: "The provided Id does not exist in the database"
        });
      } else {
        req.car = data;
        next();
      }
    })
    .catch(error => {
      res.status(5600).json({
        errorMessage: error.message
      });
      console.log(error);
    });
}

module.exports = router;
