/* Validate token for existence and expiry date */
export function validateToken() {
  let isValid = true

  const jwtToken = localStorage.getItem('jwtToken')

  if (!jwtToken) {
    isValid = false
  } else {
    const jwtPayload = JSON.parse(window.atob(jwtToken.split('.')[1]))

    if (Date.now() >= jwtPayload.exp * 1000) {
      isValid = false
    }
  }

  return isValid
}
