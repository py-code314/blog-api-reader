/* Display errors if email isn't registered or password is wrong */
export function displayAuthErrors(errorMsg, setValidFormData, setErrorMsgs) {
  // Backend sends only one error message, so I can show only one error message at a time. Can't show both messages if email and password both are incorrect
  if (errorMsg.toLowerCase().includes('email')) {
    setValidFormData((prevValid) => ({
      ...prevValid,
      email: false,
    }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      email: errorMsg,
    }))
  } else if (errorMsg.toLowerCase().includes('password')) {
    setValidFormData((prevValid) => ({
      ...prevValid,
      password: false,
    }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      password: errorMsg,
    }))
  }
}


