import { Request } from "express";
import Validator from "validator";
import isEmpty from "is-empty";
import User from "../models/User";

interface Errors {
  [key: string]: string;
}

export const validateRegisterInput = async (
  data: Request["body"]
): Promise<{ errors: Errors; isValid: boolean }> => {
  let errors: Errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.name = "First Name field is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.name = "First Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  } else {
    // Check if email is already registered
    const user = await User.findOne({
      where: { email: data.email },
    });
    if (user) {
      errors.email = "Email is already registered";
    }
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateSignInInput = (
  data: Request["body"]
): { errors: Errors; isValid: boolean } => {
  let errors: Errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
