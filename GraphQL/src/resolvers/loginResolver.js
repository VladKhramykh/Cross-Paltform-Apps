import db from "../models/db";
import bcrypt from "bcryptjs";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/configs";
import { sign } from "jsonwebtoken";

export default {
  Query: {
    auth: (_, __, { req }) => {
      if (!req.userId) {
        return null;
      }
      return db.User.findById(req.userId);
    }
  },
  Mutation: {
    register: async (_, { email, hashPassword, firstName, lastName }) => {
      try {
        const hashedPassword = await bcrypt.hash(hashPassword, 10);
        await db.User.create({
          email,
          hashPassword: hashedPassword,
          firstName,
          lastName
        });
      } catch (error) {
        console.log(error);
      }

      return true;
    },
    login: async (_, { email, hashPassword }, { res }) => {
      const user = await db.User.findOne({ email }).lean();

      if (!user) {
        console.log(email);
        return null;
      }

      const valid = await bcrypt.compare(hashPassword, user.hashPassword);
      if (!valid) {
        console.log(hashPassword);
        return null;
      }

      const refreshToken = sign(
        { userId: user._id, count: user.count },
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d"
        }
      );
      const accessToken = sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "15min"
      });

      res.cookie("refresh-token", refreshToken, { httpOnly: true });
      res.cookie("access-token", accessToken, { httpOnly: true });

      return Object.assign(user, {
        id: user._id,
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    }
  }
};
