import { Router } from "express";
import { laboratoryController as controller } from "../controllers/laboratoy";
import { Errors } from "../types/errors";

export const laboratory = Router()
  /**
   * @swagger
   * /api/laboratory/active:
   *  get:
   *    summary: returns all active laboratories
   *    tags: [Laboratory]
   *    responses:
   *      200:
   *        description: At least one laboratory was found
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Laboratory'
   *      404:
   *        description: No laboratory was found
   *      500:
   *        description: Unexpected internal error
   *
   */
  .get("/active", async (req, res) => {
    const labs = await controller.getAll();
    if (labs instanceof Errors) {
      res.status(labs.code).json(labs.message);
    } else {
      res.status(200).json(labs);
    }
  })
  /**
   * @swagger
   * /api/laboratory/byExam/{name}:
   *  get:
   *    summary: Returns a list of laboratories associated to an exam
   *    tags: [Laboratory]
   *    parameters:
   *      - in: path
   *        name: name
   *        schema:
   *          type: string
   *        required: true
   *        description: Laboratory's name
   *    responses:
   *      200:
   *        description: At least one laboratory was found
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Laboratory'
   *      404:
   *        description: No laboratory/exam was found
   *      500:
   *        description: Unexpected internal error
   */
  .get("/byLaboratory/:name", async (req, res) => {
    const labs = await controller.getByExam(req.params.name);
    if (labs instanceof Errors) {
      res.status(labs.code).json(labs.message);
    } else {
      res.status(200).json(labs);
    }
  })
  /**
   * @swagger
   * /api/laboratory/{id}:
   *  get:
   *    summary: Returns a laboratory whit the specified id
   *    tags: [Laboratory]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Laboratory's id
   *    responses:
   *      200:
   *        description: A laboratory was found
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Laboratory'
   *      404:
   *        description: No laboratory was found
   *      500:
   *        description: Unexpected internal error
   */
  .get("/:id", async (req, res) => {
    const laboratory = await controller.get(req.params.id);
    if (laboratory instanceof Errors) {
      res.status(laboratory.code).json(laboratory.message);
    } else {
      res.status(200).json(laboratory);
    }
  })
  /**
   * @swagger
   * /api/laboratory/new:
   *  post:
   *    summary: Creates a new laboratory
   *    tags: [Laboratory]
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/LaboratoryCreateForm'
   *    responses:
   *      200:
   *        description: The laboratory was created
   *        content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Laboratory'
   *      500:
   *        description: Unexpected internal error
   *
   */
  .post("/new", async (req, res) => {
    const newLab = await controller.create(req.body);
    if (newLab instanceof Errors) {
      res.status(newLab.code).json(newLab.message);
    } else {
      res.status(200).json(newLab);
    }
  })
  /**
   * @swagger
   * /api/laboratory/batch:
   *  patch:
   *    summary: Updates a list of laboratories
   *    tags: [Laboratory]
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/LaboratoryUpdateForm'
   *    responses:
   *      200:
   *        description: The laboratories were updated
   *        content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BatchResponse'
   *      404:
   *        description: No laboratory was found
   *      500:
   *        description: Unexpected internal error
   *
   */

  .patch("/batch", async (req, res) => {
    const updatedLabs = await controller.update(req.body.ids, req.body);
    if (updatedLabs instanceof Errors) {
      res.status(updatedLabs.code).json(updatedLabs.message);
    } else {
      res.status(200).json(updatedLabs);
    }
  })
  /**
   * @swagger
   * /api/laboratory/{id}:
   *  patch:
   *    summary: Updates a laboratory whit the specified id
   *    tags: [Laboratory]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Laboratory's id
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Laboratory'
   *
   *    responses:
   *      200:
   *        description: A laboratory was updated
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/BatchResponse'
   *      404:
   *        description: No laboratory was found
   *      500:
   *        description: Unexpected internal error
   */
  .patch("/:id", async (req, res) => {
    const updatedLab = await controller.update([req.params.id], req.body);
    if (updatedLab instanceof Errors) {
      res.status(updatedLab.code).json(updatedLab.message);
    } else {
      res.status(200).json(updatedLab);
    }
  })
  /**
   * @swagger
   * /api/laboratory/batch:
   *  delete:
   *    summary: Deletes a list of laboratories
   *    tags: [Laboratory]
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *               ids:
   *                type: array
   *                items:
   *                 type: string
   *    responses:
   *      200:
   *        description: The laboratory was deleted
   *        content:
   *          application/json:
   *            schema:
   *             $ref: '#/components/schemas/BatchResponse'
   *      404:
   *        description: No laboratory was found
   *      500:
   *        description: Unexpected internal error
   *
   */
  .delete("/batch", async (req, res) => {
    const deletedLabs = await controller.delete(req.body.ids);
    if (deletedLabs instanceof Errors) {
      res.status(deletedLabs.code).json(deletedLabs.message);
    } else {
      res.status(200).json(deletedLabs);
    }
  })
  /**
   * @swagger
   * /api/laboratory/{id}:
   *  delete:
   *    summary: Deletes a laboratory whit the specified id
   *    tags: [Laboratory]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Laboratory's id
   *    responses:
   *      200:
   *        description: The laboratory was deleted
   *        content:
   *          application/json:
   *            schema:
   *             $ref: '#/components/schemas/BatchResponse'
   *      404:
   *        description: No laboratory was found
   *      500:
   *        description: Unexpected internal error
   */
  .delete("/:id", async (req, res) => {
    const deletedLab = await controller.delete([req.params.id]);
    if (deletedLab instanceof Errors) {
      res.status(deletedLab.code).json(deletedLab.message);
    } else {
      res.status(200).json(deletedLab);
    }
  });
