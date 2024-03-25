import { Request, Response } from "express";
import User from "../models/User";
import {
  registerUserService,
  signInUserService,
} from "../services/authService";
import {
  validateRegisterInput,
  validateSignInInput,
} from "../config/authValidators";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input
    const validation = await validateRegisterInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json(validation.errors);
    }

    // Check if the email exists
    const userExists = await User.findOne({
      where: { email },
    });
    if (userExists) {
      return res
        .status(400)
        .json({ email: "Email is already associated with an account" });
    }

    await registerUserService(firstName, lastName, email, password);
    return res.status(200).send("Registration successful");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error in registering user");
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Validate input
    const validation = await validateSignInInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json(validation.errors);
    }

    const userData = await signInUserService(email, password, res);
    return res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Sign in error");
  }
};
