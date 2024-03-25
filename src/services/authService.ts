import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";

dotenv.config();

//User Model
import User from "../models/User";

export const registerUserService = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<void> => {
  await User.create({
    firstName,
    lastName,
    email,
    password: await bcrypt.hash(password, 15),
  });
};

export const signInUserService = async (
  email: string,
  password: string,
  res: Response
): Promise<{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
}> => {
  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    throw new Error("Email not found");
  }

  // Verify password
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error("Incorrect email and password combination");
  }

  // Authenticate user with jwt
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: (1 * 24 * 60 * 60 * 1000) as number,
  });

  // Set cookie with the JWT token
  res.cookie("accessToken", token, {
    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
    secure: true, // Cookie is only sent over HTTPS
    sameSite: "strict", // Cookie is sent only for same-site requests
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 day in this case)
  });

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accessToken: token,
  };
};
