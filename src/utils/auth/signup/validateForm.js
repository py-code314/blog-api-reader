// TODO: Refactor the function to return isValid
/* Function to check for empty inputs on form submission */
export function validateForm(
  signupFormData,
  validFormData,
  setValidFormData,
  setErrorMessages,
) {
  // Update state if input fields are empty
  if (!signupFormData.name.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, name: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      name: 'Please enter your name',
    }))
  }
  if (!signupFormData.email.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, email: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      email: 'Please enter your email address',
    }))
  }
  if (!signupFormData.password.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, password: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      password: 'Please enter a password',
    }))
  }
  if (!signupFormData.confirmPassword.trim()) {
    setValidFormData((prevValid) => ({
      ...prevValid,
      confirmPassword: false,
    }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      confirmPassword: 'Please re-enter your password',
    }))
  }

  return (
    !!validFormData.name &&
    !!validFormData.email &&
    !!validFormData.password &&
    !!validFormData.confirmPassword
  )
}
