import { email, minLength, object, string, boolean, custom } from "valibot"; // 0.74 kB

const RegistrationSchema = object({
  name: string("Your name must be a string.", [
    minLength(1, "Please enter your name."),
  ]),
  email: string("Your email must be a string.", [
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  password: string("Your password must be a string.", [
    minLength(1, "Please enter your password."),
    minLength(8, "You password must have 8 characters or more."),
  ]),
  passwordConfirm: string("Your password must be a string.", [
    minLength(1, "Please confirm your password."),
    minLength(8, "You password must have 8 characters or more."),
  ]),
  username: string("Your username must be a string.", [
    minLength(1, "Please enter your username."),
  ]),
  termsOfUse: boolean("The remember field must be a boolean.", [
    custom((value) => !value, "You must agree to the terms of use."),
  ]),
});

export default RegistrationSchema;
