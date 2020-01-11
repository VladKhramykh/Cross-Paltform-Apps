import db from "../models/db";
import ticketValidate from "../services/ticketValidate";
import joi from "joi";
import { isAuth } from "../helpers/isAuth";

export default {
  Query: {
    getTicket: async (_, __, { req }) => {
      isAuth(req);
      return await db.Ticket.find();
    },
    getTickets: async (_, { id }, { req }) => {
      isAuth(req);
      return await db.Ticket.findById(id);
    }
  },
  Mutation: {
    createTicket: async (_, args, { req }) => {
      try {
        isAuth(req);
        await joi.validate(args, ticketValidate);

        const ticket = await new db.Ticket(args).save();
        return ticket;
      } catch (error) {
        console.log(error);
      }
    },
    updateTicket: async (_, args, { req }) => {
      try {
        isAuth(req);
        await joi.validate(args, ticketValidate);
        const ticket = await db.Ticket.findByIdAndUpdate(args.id, args);
        return ticket;
      } catch (error) {
        console.log(error);
      }
    },
    deleteTicket: async (_, { id }, { req }) => {
      isAuth(req);
      await db.Ticket.findByIdAndRemove(id);
      return "Deleted";
    }
  }
};
