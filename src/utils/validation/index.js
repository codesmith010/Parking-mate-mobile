import { REGEX } from "../../constants/regex";
import { ERRORS } from "../../labels/error";

export const validateRegister = ({
  FirstName = "",
  LastName = "",
  Email = "",
  Password = "",
  PhoneNumber = "",
}) => {
  if (REGEX.firstName.test(FirstName.trim()) === false)
    return ERRORS.enterFirstName;
  if (REGEX.lastName.test(LastName.trim()) === false)
    return ERRORS.enterLastName;
  if (REGEX.phoneNumber.test(PhoneNumber.trim()) === false)
    return ERRORS.enterValidPhoneNumber;

  if (REGEX.email.test(Email) === false) return ERRORS.enterEmail;
  if (REGEX.password.test(Password) === false) return ERRORS.passwordValidation;

  return "";
};

export const validateLogin = ({ Email = "", Password = "" }) => {
  if (REGEX.email.test(Email) === false || Email === "")
    return ERRORS.enterEmail;

  if (Password === "") return ERRORS.enterPassword;

  return "";
};

export const validateForgetPassword = ({ forgetEmail = "" }) => {
  if (REGEX.email.test(forgetEmail) === false || forgetEmail === "")
    return ERRORS.enterEmail;

  return "";
};

export const validateResetPassword = ({
  password = "",
  confirmPassword = "",
}) => {
  if (REGEX.password.test(password) === false) {
    return ERRORS.passwordValidation;
  }

  // Check if password is empty
  if (!password.trim()) {
    return ERRORS.emptyPassword;
  }

  // Check if confirmPassword is empty
  if (!confirmPassword.trim()) {
    return ERRORS.emptyPassword;
  }

  // Check if confirmPassword matches password
  if (confirmPassword !== password) {
    return ERRORS.enterConfirmPassword;
  }

  return "";
};
