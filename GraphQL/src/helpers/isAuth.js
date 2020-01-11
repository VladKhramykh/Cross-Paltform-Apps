import { AuthenticationError } from "apollo-server-express";

export const isAuth = req => {
  if (!req.userId) throw new AuthenticationError("You are unauthorized");
};
