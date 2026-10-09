// TODO: Refactor the function to return isValid
/* Function to check for empty log-in form inputs */
export function validateForm(
  loginFormData,
  validFormData,
  setValidFormData,
  setErrorMsgs,
) {
  let isValid = true

  // Update state if input fields are empty
  if (!loginFormData.email.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, email: false }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      email: 'Please enter your email address',
    }))
    isValid = false
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, email: true }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      email: '',
    }))
  }
  if (!loginFormData.password.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, password: false }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      password: 'Please enter a password',
    }))
    isValid = false
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, password: true }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      password: '',
    }))
  }

  return isValid
}
