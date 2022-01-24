import { Router } from "express";
import { laboratoryController as controller } from "../controllers/laboratoy";
import { Errors } from "../types/errors";

export const laboratory = Router()
  // list all active laboratories
  .get("/active", async (req, res) => {
    const labs = await controller.getAll();
    if (labs instanceof Errors) {
      res.status(labs.code).json(labs.message);
    } else {
      res.status(200).json(labs);
    }
  })
  // search laboratories using an exam associated to them
  .get("/byExam/:name", async (req, res) => {
    const labs = await controller.getByExam(req.params.name);
    if (labs instanceof Errors) {
      res.status(labs.code).json(labs.message);
    } else {
      res.status(200).json(labs);
    }
  })
  // check one laboratory
  .get("/:id", async (req, res) => {
    const laboratory = await controller.get(req.params.id);
    if (laboratory instanceof Errors) {
      res.status(laboratory.code).json(laboratory.message);
    } else {
      res.status(200).json(laboratory);
    }
  })

  // create new laboratory (can be used in lot)
  .post("/new", async (req, res) => {
    const newLab = await controller.create(req.body);
    if (newLab instanceof Errors) {
      res.status(newLab.code).json(newLab.message);
    } else {
      res.status(200).json(newLab);
    }
  })
  // update a batch of laboratories at once
  .patch("/batch", async (req, res) => {
    const updatedLabs = await controller.update(req.body.ids, req.body);
    if (updatedLabs instanceof Errors) {
      res.status(updatedLabs.code).json(updatedLabs.message);
    } else {
      res.status(200).json(updatedLabs);
    }
  })
  // update a laboratory
  .patch("/:id", async (req, res) => {
    const updatedLab = await controller.update([req.params.id], req.body);
    if (updatedLab instanceof Errors) {
      res.status(updatedLab.code).json(updatedLab.message);
    } else {
      res.status(200).json(updatedLab);
    }
  })
  // delete logically a batch of laboratories at once
  .delete("/batch", async (req, res) => {
    const deletedLabs = await controller.delete(req.body.ids);
    if (deletedLabs instanceof Errors) {
      res.status(deletedLabs.code).json(deletedLabs.message);
    } else {
      res.status(200).json(deletedLabs);
    }
  })
  // delete logically a laboratory
  .delete("/:id", async (req, res) => {
    const deletedLab = await controller.delete([req.params.id]);
    if (deletedLab instanceof Errors) {
      res.status(deletedLab.code).json(deletedLab.message);
    } else {
      res.status(200).json(deletedLab);
    }
  });
