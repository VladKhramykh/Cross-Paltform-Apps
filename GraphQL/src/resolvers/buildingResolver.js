import db from "../models/db";
import buildingValidation from "../services/buildingValidate";
import joi from "joi";
import { isAuth } from "../helpers/isAuth";

export default {
  Query: {
    getBuildings: async () => {
      const data = await db.Building.find();
      return data;
    },
    getBuilding: async (_, { id }) => {
      return await db.Building.findById(id);
    }
  },
  Building: {
    concerts: async parent => {
      const concerts = await db.Concert.findById(parent.concerts).find();
      return concerts;
    }
  },
  Mutation: {
    createBuilding: async (_, args, { req }) => {
      try {
        isAuth(req);
        await joi.validate(args, buildingValidation);
        const building = await new db.Building(args).save();
        return building;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    updateBuilding: async (_, args, { req }) => {
      try {
        isAuth(req);
        await joi.validate(args, buildingValidation);
        const building = await db.Building.findByIdAndUpdate(args.id, args, {
          new: true
        });
        return building;
      } catch (error) {
        console.log(error);
      }
    },
    deleteBuilding: async (_, { id }, { req }) => {
      try {
        isAuth(req);
        await db.Building.findByIdAndRemove(id);
        return "Deleted";
      } catch (error) {
        return error;
      }
    }
  }
};
