/* Function to check for empty inputs on form submission */
export function displayEmptyInputErrors(
  loginFormData,
  setValidFormData,
  setErrorMessages,
) {
  // Update state if input fields are empty
  if (!loginFormData.email.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, email: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      email: 'Please enter your email address',
    }))
  }
  if (!loginFormData.password.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, password: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      password: 'Please enter a password',
    }))
  }
}
