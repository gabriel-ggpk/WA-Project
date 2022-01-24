import { exams } from "../models";
import { IExam } from "../models/exam";
import { laboratories } from "../models";
import { ILaboratory } from "../models/laboratory";
import { Errors } from "../types/errors";

class AssociationController {
  // searches for a laboratory and an exam and then adds the lab id to the exam
  async associate(examId: string, labId: string) {
    try {
      const laboratory = await laboratories.findById(labId);
      if (!laboratory) return new Errors("No laboratory found", 404);
      const association = await exams.findByIdAndUpdate(
        examId,
        { $addToSet: { laboratories: labId } },
        { new: true }
      );
      if (!association) return new Errors("No exam found", 404);
      return association;
    } catch (error: any) {
      return new Errors(`An unexpected error happened: ${error.message}`, 500);
    }
  }
  // searches for a laboratory and an exam and then removes the lab from the exam's lab id list
  async disassociate(examId: string, labId: string) {
    try {
      const laboratory = await laboratories.findById(labId);
      if (!laboratory) return new Errors("No laboratory found", 404);
      const association = await exams.findByIdAndUpdate(
        examId,
        { $pull: { laboratories: labId } },
        { new: true }
      );
      if (!association) return new Errors("No exam found", 404);
      return association;
    } catch (error: any) {
      return new Errors(`An unexpected error happened: ${error.message}`, 500);
    }
  }
}
export const associationController = new AssociationController();
