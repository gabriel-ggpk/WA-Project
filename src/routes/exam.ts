import { Router } from "express";
import { examController as controller } from "../controllers/exam";
import { Errors } from "../types/errors";

export const exam = Router()
  /**
   * @swagger
   * /api/exam/active:
   *  get:
   *    summary: returns all active laboratories
   *    tags: [Exam]
   *    responses:
   *      200:
   *        description: At least one exam was found
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Exam'
   *      404:
   *        description: No exam was found
   *      500:
   *        description: Unexpected internal error
   *
   */
  .get("/active", async (req, res) => {
    const exams = await controller.getAll();
    if (exams instanceof Errors) {
      res.status(exams.code).json(exams.message);
    } else {
      res.status(200).json(exams);
    }
  })
  /**
   * @swagger
   * /api/exam/{id}:
   *  get:
   *    summary: Returns a exam whit the specified id
   *    tags: [Exam]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Exam's id
   *    responses:
   *      200:
   *        description: An exam was found
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Exam'
   *      404:
   *        description: No exam was found
   *      500:
   *        description: Unexpected internal error
   */
  .get("/:id", async (req, res) => {
    const exam = await controller.get(req.params.id);
    if (exam instanceof Errors) {
      res.status(exam.code).json(exam.message);
    } else {
      res.status(200).json(exam);
    }
  })
  /**
   * @swagger
   * /api/exam/new:
   *  post:
   *    summary: Creates a new exam
   *    tags: [Exam]
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/ExamCreateForm'
   *    responses:
   *      200:
   *        description: The exam was created
   *        content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Exam'
   *      500:
   *        description: Unexpected internal error
   *
   */
  .post("/new", async (req, res) => {
    const newExam = await controller.create(req.body);
    if (newExam instanceof Errors) {
      res.status(newExam.code).json(newExam.message);
    } else {
      res.status(200).json(newExam);
    }
  })
  /**
   * @swagger
   * /api/exam/batch:
   *  patch:
   *    summary: Updates a list of Exams
   *    tags: [Exam]
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *            schema:
   *             $ref: '#/components/schemas/ExamUpdateForm'
   *    responses:
   *      200:
   *        description: The exams were updated
   *        content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BatchResponse'
   *      404:
   *        description: No exam was found
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
   * /api/exam/{id}:
   *  patch:
   *    summary: Updates an exam whit the specified id
   *    tags: [Exam]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Exam's id
   *    requestBody:
   *      required: true
   *      content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Exam'
   *
   *    responses:
   *      200:
   *        description: An exam was updated
   *        content:
   *          application/json:
   *            schema:
   *                $ref: '#/components/schemas/BatchResponse'
   *      404:
   *        description: No exam was found
   *      500:
   *        description: Unexpected internal error
   */
  .patch("/:id", async (req, res) => {
    const updatedExam = await controller.update([req.params.id], req.body);
    if (updatedExam instanceof Errors) {
      res.status(updatedExam.code).json(updatedExam.message);
    } else {
      res.status(200).json(updatedExam);
    }
  })
  /**
   * @swagger
   * /api/exam/batch:
   *  delete:
   *    summary: Deletes a list of exams
   *    tags: [Exam]
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
   *        description: The exam was deleted
   *        content:
   *          application/json:
   *            schema:
   *             $ref: '#/components/schemas/BatchResponse'
   *      404:
   *        description: No exam was found
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
   * /api/exam/{id}:
   *  delete:
   *    summary: Deletes an exam whit the specified id
   *    tags: [Exam]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Exam's id
   *    responses:
   *      200:
   *        description: The exam was deleted
   *        content:
   *          application/json:
   *            schema:
   *             $ref: '#/components/schemas/BatchResponse'
   *      404:
   *        description: No exam was found
   *      500:
   *        description: Unexpected internal error
   */
  .delete("/:id", async (req, res) => {
    const deletedExam = await controller.delete([req.params.id]);
    if (deletedExam instanceof Errors) {
      res.status(deletedExam.code).json(deletedExam.message);
    } else {
      res.status(200).json(deletedExam);
    }
  });
