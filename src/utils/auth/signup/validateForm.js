// TODO: Refactor the function to return isValid
/* Function to check for empty inputs on form submission */
export function validateForm(
  signupFormData,
  validFormData,
  setValidFormData,
  setErrorMessages,
) {
  let isValid = true

  // Update state if input fields are empty
  if (!signupFormData.name.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, name: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      name: 'Please enter your name',
    }))
    isValid = false
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, name: true }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      name: '',
    }))
  }

  if (!signupFormData.email.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, email: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      email: 'Please enter your email address',
    }))
    isValid = false
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, email: true }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      email: '',
    }))
  }

  if (!signupFormData.password.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, password: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      password: 'Please enter a password',
    }))
    isValid = false
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, password: true }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      password: '',
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
    isValid = false
  } else {
    setValidFormData((prevValid) => ({
      ...prevValid,
      confirmPassword: true,
    }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      confirmPassword: '',
    }))
  }

  return isValid
}
