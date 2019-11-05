const express = require("express");
const router = express.Router();
const db = require("./db-config");

router.get("/:id", handleGetCarById);
router.get("/", handleAllCarsGet);
router.post("/", handleCarPost);
router.put("/:id", handleCarPut);
router.delete("/:id",handleCarDelete);

function handleCarDelete(req,res) {
    db("cars").where({id:req.params.id}).delete()
    .then(data => {
        console.log(data);
        res.status(200).json(data);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    })
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
  db("cars")
    .where({ id: req.params.id })
    .then(data => {
      res.status(200).json(data);
      console.table(data);
    })
    .catch(error => {
      res.status(500).json(error);
      console.log(error);
    });
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

module.exports = router;
