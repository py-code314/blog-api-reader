/* Function to validate password */
export function validatePasswordInput(
  password,
  setValidFormData,
  setErrorMessages,
) {
  const trimmedPassword = password.trim()
  const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

  if (!trimmedPassword) {
    setValidFormData((prevValid) => ({ ...prevValid, password: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      password: 'Please enter a password',
    }))
  } else if (!passwordRegExp.test(trimmedPassword)) {
    setValidFormData((prevValid) => ({ ...prevValid, password: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      password: 'Please enter a valid password',
    }))
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, password: true }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      password: '',
    }))
  }
}
