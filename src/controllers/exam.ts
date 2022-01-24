import { exams } from "../models";
import { IExam } from "../models/exam";
import { Errors } from "../types/errors";

class ExamController {
  //creates one or more exam document on the database
  async create(exam: IExam) {
    try {
      const newExam = await exams.create(exam);
      return newExam;
    } catch (error: any) {
      if (error.name == "ValidationError")
        return new Errors(error.message as string, 400);
      else
        return new Errors(
          `An unexpected error happened: ${error.message}`,
          500
        );
    }
  }
  //gets an exam by id
  async get(id: string) {
    try {
      const exam = await exams.findOne({ _id: id, removed: false });
      if (!exam) return new Errors("No exam found", 404);
      else return exam;
    } catch (error: any) {
      return new Errors(`An unexpected error happened: ${error.message}`, 500);
    }
  }
  //gets all active exams
  async getAll() {
    try {
      const activeExams = await exams.find({ status: "ativo", removed: false });
      if (!activeExams) return new Errors("No exams found", 404);
      else return activeExams;
    } catch (error: any) {
      return new Errors(`An unexpected error happened: ${error.message}`, 500);
    }
  }
  //updates one or more exams
  async update(id: string[], exam: any) {
    try {
      const updatedExam = await exams.updateMany(
        { _id: { $in: id }, removed: false },
        { $set: exam },
        { runValidators: true, context: "query" }
      );
      if (!updatedExam) return new Errors("No exams found", 404);
      else return updatedExam;
    } catch (error: any) {
      return new Errors(`An unexpected error happened: ${error.message}`, 500);
    }
  }
  // delete one or more exams by setting the "removed" property to true
  async delete(id: string[]) {
    try {
      const deletedExam = await exams.updateMany(
        { _id: { $in: id }, removed: false },
        { $set: { removed: true } }
      );
      if (!deletedExam) return new Errors("No exams found", 404);
      else return deletedExam;
    } catch (error: any) {
      return new Errors(`An unexpected error happened: ${error.message}`, 500);
    }
  }
}

export const examController = new ExamController();
