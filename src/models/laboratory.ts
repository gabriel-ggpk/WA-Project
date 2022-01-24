// @ts-ignore
import { Document, model, Schema } from "mongoose";
// @ts-ignore
import uniqueValidator from "mongoose-unique-validator";
export interface ILaboratory extends Document {
  name: string;
  address: string;
  status: "ativo" | "inativo";
  removed?: boolean;
}

export const labSchema = new Schema<ILaboratory>({
  name: {
    type: String,
    required: [() => true, "The 'name' field has to be defined"],
  },
  address: {
    type: String,
    required: [() => true, "The 'address' field has to be defined"],
  },
  status: {
    type: String,
    required: false,
    default: "ativo",
    validate: {
      validator: (status: string) => {
        return status == "ativo" || status == "inativo";
      },
      message: () => "The data in status field is invalid.",
    },
  },
  removed: {
    type: Boolean,
    required: false,
    default: false,
  },
});
//using this plugin to force mongoose to validate the input of functions such as updateMany according to the model validation
labSchema.plugin(uniqueValidator);
export const laboratoryModel = model<ILaboratory>("Laboratory", labSchema);
