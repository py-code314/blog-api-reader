/* Function to validate email */
export function validateEmailInput(email, setValidFormData, setErrorMessages) {
  const trimmedEmail = email.trim()
 // Checking against a simple email regex is sufficient for login form
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!trimmedEmail) {
    setValidFormData((prevValid) => ({ ...prevValid, email: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      email: 'Please enter your email address',
    }))
  } else if (!emailRegExp.test(trimmedEmail)) {
    setValidFormData((prevValid) => ({ ...prevValid, email: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      email: 'Please enter a valid email address',
    }))
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, email: true }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      email: '',
    }))
  }
}
