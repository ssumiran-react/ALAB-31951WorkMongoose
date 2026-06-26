import express from "express";
import connDB from "../db/conn.js";
import GradeModel from '../models/GradeModel.js';

const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  // let collection = await db.collection("grades");
  // let newDocument = req.body;

  // // rename fields for backwards compatibility
  // if (newDocument.student_id) {
  //   newDocument.learner_id = newDocument.student_id;
  //   delete newDocument.student_id;
  // }
  //let result = await collection.insertOne(newDocument);

  const result = await GradeModel.insertOne(req.body) ;
  res.json(result).status(204);
});

// Get a single grade entry
router.get("/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { _id: new ObjectId(req.params.id) };
  // let result = await collection.findOne(query);
  
  const result = await GradeModel.findById(req.params.id) ;
  if (!result) res.send("Not found").status(404);
  else res.json(result).status(200);
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { _id: new ObjectId(req.params.id) };

  // let result = await collection.updateOne(query, {
  //   $push: { scores: req.body }
  // });

  const result = await GradeModel.findByIdAndUpdate(req.params.id, {$push: { scores: req.body }}) ;
  if (!result) res.send("Not found").status(404);
  else res.json(result).status(200);
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { _id: new ObjectId(req.params.id) };

  // let result = await collection.updateOne(query, {
  //   $pull: { scores: req.body }
  // });

  const result = await GradeModel.findByIdAndUpdate(req.params.id, {$pull: { scores: req.body }}) ;
  if (!result) res.send("Not found").status(404);
  else res.json(result).status(200);
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => { 
  // let collection = await db.collection("grades");
  // let query = { _id: new ObjectId(req.params.id) };
  // let result = await collection.deleteOne(query);
  
  const result = await GradeModel.findByIdAndDelete(req.params.id);
  if (!result) res.send("Not found").status(404);
  else res.json(result).status(200);
});

// Get route for backwards compatibility
router.get("/student/:id", async (req, res) => {
  res.redirect(`learner/${req.params.id}`);
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  let query = { student_id: Number(req.params.id) };

  // Check for class_id parameter
  if (req.query.class) query.class_id = Number(req.query.class);

  const result = await GradeModel.find(query);
  if (!result) res.send("Not found").status(404);
  else res.json(result).status(200);
});

// Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { learner_id: Number(req.params.id) };

  // let result = await collection.deleteOne(query);

  const result = await GradeModel.findOneAndDelete({student_id: Number(req.params.id) });
  if (!result) res.send("Not found").status(404);
  else res.json(result).status(200);
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  let query = { class_id: Number(req.params.id) };
  
  // Check for learner_id parameter
  if (req.query.learner) query.student_id = Number(req.query.learner);

  const result = await GradeModel.find(query);
  if (!result) res.send("Not found").status(404);
  else res.json(result).status(200);
});

// Update a class id
router.patch("/class/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { class_id: Number(req.params.id) };

  // let result = await collection.updateMany(query, {
  //   $set: { class_id: req.body.class_id }
  // });

  const result = await GradeModel.updateMany({ class_id: Number(req.params.id) }, {$set: { class_id: req.body.class_id }}) ;
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a class
router.delete("/class/:id", async (req, res) => {
  // let collection = await db.collection("grades");
  // let query = { class_id: Number(req.params.id) };

  // let result = await collection.deleteMany(query);

  const result = await GradeModel.deleteMany({ class_id: Number(req.params.id) });
  if (!result) res.send("Not found").status(404);
  else res.json(result).status(200);
});

export default router;
