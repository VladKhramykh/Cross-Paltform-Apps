import db from "../models/db";
import additionValidate from "../services/additionalValidate";
import joi from "joi";
import { isAuth } from "../helpers/isAuth";

export default {
  Query: {
    getAdditions: async () => {
      return await db.Additional.find();
    },
    getAddition: async (_, { id }) => {
      return await db.Additional.findById(id);
    }
  },
  Mutation: {
    createAddition: async (_, args, { req }) => {
      try {
        isAuth(req);
        await joi.validate(args, additionValidate);
        const addition = await new db.Additional(args).save();
        return addition;
      } catch (error) {
        console.log(error);
      }
    },
    updateAddition: async (_, args, { req }) => {
      try {
        isAuth(req);
        await joi.validate(args, additionValidate);
        const addition = await db.Additional.findByIdAndUpdate(args.id, args);
        return addition;
      } catch (error) {
        console.log(error);
      }
    },
    deleteAddition: async (_, { id }, { req }) => {
      isAuth(req);
      await db.Additional.findByIdAndRemove(id);
      return "Deleted";
    }
  }
};
