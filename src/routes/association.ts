import { Router } from "express";
import { associationController as controller } from "../controllers/association";
import { Errors } from "../types/errors";

export const association = Router()
  // associates a lab id to an exam
  .patch("/new", async (req, res) => {
    const association = await controller.associate(
      req.body.examId,
      req.body.labId
    );
    if (association instanceof Errors) {
      res.status(association.code).json(association.message);
    } else {
      res.status(200).json(association);
    }
  })
  // disassociates a lab associated to an exam
  .delete("/remove", async (req, res) => {
    const disassociation = await controller.disassociate(
      req.body.examId,
      req.body.labId
    );
    if (disassociation instanceof Errors) {
      res.status(disassociation.code).json(disassociation.message);
    } else {
      res.status(200).json(disassociation);
    }
  });
