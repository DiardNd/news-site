export interface PostFormState {
  firstName: string;
  lastName: string;
  email: string;
  file: File | null;
  password: string;
  emailError: string;
  passwordError: string;
  firstNameError: string;
  lastNameError: string;
}
