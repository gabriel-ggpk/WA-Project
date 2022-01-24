import { Router } from "express";
import { examController as controller } from "../controllers/exam";
import { Errors } from "../types/errors";

export const exam = Router()
  // list all active exams
  .get("/active", async (req, res) => {
    const exams = await controller.getAll();
    if (exams instanceof Errors) {
      res.status(exams.code).json(exams.message);
    } else {
      res.status(200).json(exams);
    }
  })
  // check one exam
  .get("/:id", async (req, res) => {
    const exam = await controller.get(req.params.id);
    if (exam instanceof Errors) {
      res.status(exam.code).json(exam.message);
    } else {
      res.status(200).json(exam);
    }
  })
  // create a new exam
  .post("/new", async (req, res) => {
    const newExam = await controller.create(req.body);
    if (newExam instanceof Errors) {
      res.status(newExam.code).json(newExam.message);
    } else {
      res.status(200).json(newExam);
    }
  })
  // update a batch of exams at once
  .patch("/batch", async (req, res) => {
    const updatedLabs = await controller.update(req.body.ids, req.body);
    if (updatedLabs instanceof Errors) {
      res.status(updatedLabs.code).json(updatedLabs.message);
    } else {
      res.status(200).json(updatedLabs);
    }
  })
  .patch("/:id", async (req, res) => {
    const updatedExam = await controller.update([req.params.id], req.body);
    if (updatedExam instanceof Errors) {
      res.status(updatedExam.code).json(updatedExam.message);
    } else {
      res.status(200).json(updatedExam);
    }
  })
  // delete logically a batch of exams at once
  .delete("/batch", async (req, res) => {
    const deletedLabs = await controller.delete(req.body.ids);
    if (deletedLabs instanceof Errors) {
      res.status(deletedLabs.code).json(deletedLabs.message);
    } else {
      res.status(200).json(deletedLabs);
    }
  })
  // delete logically an exams
  .delete("/:id", async (req, res) => {
    const deletedExam = await controller.delete([req.params.id]);
    if (deletedExam instanceof Errors) {
      res.status(deletedExam.code).json(deletedExam.message);
    } else {
      res.status(200).json(deletedExam);
    }
  });
