import { email, minLength, object, string, boolean } from "valibot";

const LoginSchema = object({
  email: string("Your email must be a string.", [
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  password: string("Your password must be a string.", [
    minLength(1, "Please enter your password."),
    minLength(8, "You password must have 8 characters or more."),
  ]),
  remember: boolean("The remember field must be a boolean."),
});

export default LoginSchema;
