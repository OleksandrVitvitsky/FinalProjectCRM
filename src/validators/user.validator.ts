import joi from 'joi';

import { regexConstant } from '../constants/regex.constant';

export class UserValidator {
  private static Name = joi.string().min(3).trim();
  private static surname = joi.string().min(5).trim();
  private static email = joi
    .string()
    .lowercase()
    .regex(regexConstant.EMAIL)
    .trim();
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();

  public static createUser = joi.object({
    name: this.Name.required(),
    surname: this.surname,
    email: this.email.required(),
    password: this.password.required(),
  });

  // public static updateUser = joi.object({
  //   name: this.name,
  //   age: this.age,
  //   email: this.email,
  //   phone: this.phone,
  // });
  //
  // public static login = joi.object({
  //   email: this.email.required(),
  //   password: this.password.required(),
  // });
  //
  // public static forgotPassword = joi.object({
  //   email: this.email.required(),
  // });
  //
  // public static forgotPasswordSet = joi.object({
  //   password: this.password.required(),
  // });
  //
  // public static changePassword = joi.object({
  //   oldPassword: this.password.required(),
  //   newPassword: this.password.required(),
  // });
}
