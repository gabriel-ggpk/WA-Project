import { exams, laboratories } from "../models";
import { ILaboratory } from "../models/laboratory";
import { Errors } from "../types/errors";

class LaboratoryController {
  // create a lab on the database
  async create(lab: ILaboratory) {
    try {
      const newLab = await laboratories.create(lab);
      return newLab;
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
  // retrieve a laboratory by id
  async get(id: string) {
    try {
      const laboratory = await laboratories.findOne({
        _id: id,
        removed: false,
      });
      if (!laboratory) return new Errors("No laboratory found", 404);
      else return laboratory;
    } catch (error: any) {
      return new Errors(`An unexpected error happened: ${error.message}`, 500);
    }
  }
  // retrieve all laboratories that are associated to an exam
  async getByExam(examName: string) {
    try {
      const exam = await exams.findOne({ name: examName });
      if (!exam) return new Errors("No Exam found", 404);
      const labs = await laboratories.find({ _id: { $in: exam.laboratories } });
      if (!labs) return new Errors("No Laboratories found", 404);
      return labs;
    } catch (error: any) {
      return new Errors(`An unexpected error happened: ${error.message}`, 500);
    }
  }
  // retrieve all active laboraotries
  async getAll() {
    try {
      const activeLabs = await laboratories.find({
        status: "ativo",
        removed: false,
      });
      if (!activeLabs) return new Errors("No laboratory found", 404);
      else return activeLabs;
    } catch (error: any) {
      return new Errors(`An unexpected error happened: ${error.message}`, 500);
    }
  }
  // update one or more laboratories
  async update(id: string[], lab: any) {
    try {
      const updatedLab = await laboratories.updateMany(
        { _id: { $in: id }, removed: false },
        { $set: lab },
        { runValidators: true, context: "query" }
      );
      if (!updatedLab) return new Errors("No laboratory found", 404);
      else return updatedLab;
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
  // delete one or more laboratories by setting the "removed" property to true
  async delete(id: string[]) {
    try {
      const deletedLab = await laboratories.updateMany(
        { _id: { $in: id }, removed: false },
        { $set: { removed: true } },
        { new: true }
      );
      if (!deletedLab) return new Errors("No laboratory found", 404);
      else return deletedLab;
    } catch (error: any) {
      return new Errors(`An unexpected error happened: ${error.message}`, 500);
    }
  }
}
export const laboratoryController = new LaboratoryController();
