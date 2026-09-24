/* Function to validate email */
export function validateEmailInput(
  email,
  setValidFormData,
  setErrorMessages
) {
  const trimmedEmail = email.trim()
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
  
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
