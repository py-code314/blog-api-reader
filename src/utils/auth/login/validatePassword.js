/* Function to validate password */
export function validatePasswordInput(
  password,
  setValidFormData,
  setErrorMsgs,
) {
  // No need for password regex, validating the length is enough
  const trimmedPassword = password.trim()
  if (!trimmedPassword) {
    setValidFormData((prevValid) => ({ ...prevValid, password: false }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      password: 'Please enter a password',
    }))
  } else if (trimmedPassword.length < 8) {
    setValidFormData((prevValid) => ({ ...prevValid, password: false }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      password: 'Password must be at least 8 characters in length.',
    }))
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, password: true }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      password: '',
    }))
  }
}
