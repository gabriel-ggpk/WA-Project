import { Router } from "express";
import { associationController as controller } from "../controllers/association";
import { Errors } from "../types/errors";

export const association = Router()
  /**
   * @swagger
   * /api/association/new:
   *  patch:
   *    summary: Associates a laboratory's id to an exam
   *    tags: [Association]
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *               examId:
   *                type: string
   *               labId:
   *                type: string
   *
   *    responses:
   *      200:
   *        description: The laboratory was associated
   *        content:
   *          application/json:
   *            schema:
   *             $ref: '#/components/schemas/Exam'
   *      404:
   *        description: No exam/laboratory was found
   *      500:
   *        description: Unexpected internal error
   *
   */
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
  /**
   * @swagger
   * /api/association/remove:
   *  delete:
   *    summary: Disassociates a laboratory's id to an exam
   *    tags: [Association]
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *               examId:
   *                type: string
   *               labId:
   *                type: string
   *
   *    responses:
   *      200:
   *        description: The laboratory was disassociated
   *        content:
   *          application/json:
   *            schema:
   *             $ref: '#/components/schemas/Exam'
   *      404:
   *        description: No exam/laboratory was found
   *      500:
   *        description: Unexpected internal error
   *
   */
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
