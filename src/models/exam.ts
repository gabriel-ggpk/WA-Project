import { Document, model, Schema } from "mongoose";
import UniqueValidator from "mongoose-unique-validator";

export interface IExam extends Document {
  name: string;
  type: "analise clinica" | "imagem";
  status: "ativo" | "inativo";
  laboratories?: string[];
  removed?: boolean;
}
const examSchema = new Schema<IExam>({
  name: {
    type: String,
    required: [() => true, "The 'name' field has to be defined"],
  },
  type: {
    type: String,
    required: [() => true, "The 'type' field has to be defined"],
    validate: {
      validator: (type: string) => {
        return type == "analise clinica" || type == "imagem";
      },
      message: () => "The data in 'type' field is invalid.",
    },
  },
  status: {
    type: String,
    required: false,
    default: "ativo",
    validate: {
      validator: (status: string) => {
        return status == "ativo" || status == "inativo";
      },
      message: () => "The data in 'status' field is invalid.",
    },
  },
  laboratories: { type: [String], required: false, default: [] },
  removed: {
    type: Boolean,
    required: false,
    default: false,
  },
});
//using this plugin to force mongoose to validate the input of functions such as updateMany according to the model validation
examSchema.plugin(UniqueValidator);
export const examModel = model<IExam>("Exam", examSchema);
