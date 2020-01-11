import db from "../models/db";
import concertValidate from "../services/concertValidate";
import joi from "joi";
import { isAuth } from "../helpers/isAuth";

export default {
  Query: {
    getConcert: async (_, { id }) => {
      return await db.Concert.findById(id);
    },
    getConcerts: async (_, { name, limit, skip }) => {
      return await db.Concert.find({ name: new RegExp(`${name}`) }, null, {
        limit,
        skip
      });
    }
  },
  Mutation: {
    createConcert: async (_, args, { req }) => {
      try {
        isAuth(req);
        await joi.validate(args, concertValidate);
        const concert = await new db.Concert(args).save();
        return concert;
      } catch (error) {
        console.log(error);
      }
    },
    updateConcert: async (_, args, { req }) => {
      try {
        isAuth(req);
        await joi.validate(args, concertValidate);
        const concert = await db.Concert.findByIdAndUpdate(args.id, args);
        return concert;
      } catch (error) {
        console.log(error);
      }
    },
    deleteConcert: async (_, { id }, { req }) => {
      isAuth(req);
      await db.Concert.findByIdAndRemove(id);
      return "Deleted";
    }
  }
};
