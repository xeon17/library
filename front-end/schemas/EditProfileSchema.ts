import { email, minLength, object, string, date, any } from "valibot";

const EditProfileSchema = object({
  email: string("Your email must be a string.", [
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  name: string("Your name must be a string.", [
    minLength(1, "Please enter your name."),
  ]),
  username: string("Your username must be a string.", [
    minLength(1, "Please enter your username."),
  ]),
  city: string("Your city must be a string."),
  country: string("Your country must be a string."),
  address: string("Your address must be a string."),
  gender: string("Your gender must be a string."),
  birthDate: date("Your birth date must be a date."),
  photo: any(),
});

export default EditProfileSchema;
