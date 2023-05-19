import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpError from "../models/http-error";

interface JwtPayload {
  userId: string;
}

module.exports = (req: any, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as JwtPayload;
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};
