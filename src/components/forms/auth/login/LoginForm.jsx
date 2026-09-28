/* -------------------- Styles -------------------- */
import styles from './LoginForm.module.css'
/* -------------------- Icons -------------------- */
import checkIcon from '../../../../assets/icons/icon-check.svg'
import errorIcon from '../../../../assets/icons/icon-error-2.svg'
/* -------------------- Hooks -------------------- */
import { useRef, useEffect, useState } from 'react'
// /* -------------------- Context -------------------- */

/* -------------------- Components -------------------- */
import Button from '../../../core/button/Button'
/* -------------------- Functions -------------------- */
import {
  validateEmailInput,
  validatePasswordInput,
  displayEmptyInputErrors,
} from '../../../../utils/auth/login/index.js'

/* Login form component */
const LoginForm = () => {
  const emailInputRef = useRef(null)

  // State variables
  const defaultLoginFormData = {
    email: '',
    password: '',
  }
  const [loginFormData, setLoginFormData] = useState(defaultLoginFormData)

  const defaultValidFormData = {
    email: null,
    password: null,
  }
  const [validFormData, setValidFormData] = useState(defaultValidFormData)

  const defaultErrorMsgs = {
    email: '',
    password: '',
  }
  const [errorMsgs, setErrorMsgs] = useState(defaultErrorMsgs)

  const [loginErrorMsg, setLoginErrorMsg] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  useEffect(() => {
    // Focus in email field after page load
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [])

  // Handle form fields
  const handleEmailChange = (e) => {
    const email = e.target.value

    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      email,
    }))
    validateEmailInput(email, setValidFormData, setErrorMsgs)
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value

    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      password,
    }))

    validatePasswordInput(password, setValidFormData, setErrorMsgs)
  }

  const validateForm = () => {
    displayEmptyInputErrors(loginFormData, setValidFormData, setErrorMsgs)

    if (validFormData.email === true && validFormData.password === true) {
      return true
    } else {
      return false
    }
  }

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsFormSubmitted(true)
    setLoginErrorMsg('')

    // const isValid = true
    const isValid = validateForm()
    console.log('🚀 ~ handleFormSubmit ~ isValid:', isValid)

    if (!isValid) {
      setIsFormSubmitted(false)
      return
    }
  }

  return (
    <div className={styles.login}>
      {/* Display server and network errors  */}
      {loginErrorMsg && (
        <p className={styles.loginError} aria-live="polite" id="login-error">
          {loginErrorMsg}
        </p>
      )}

      {/* Log-in form */}
      <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
        {/* Email input */}
        <div className={styles.formControl}>
          <label htmlFor="email" className={styles.formLabel}>
            Email (required)
          </label>

          <div className={styles.formValid}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="cosmo.kramer@protonmail.com"
              className={styles.formInput}
              autoComplete="email"
              inputMode="email"
              required
              value={loginFormData.email}
              onChange={handleEmailChange}
              ref={emailInputRef}
            />
            {validFormData.email && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkIcon}
                alt=""
                width={25}
                height={25}
              />
            )}
          </div>
          {validFormData.email === false && (
            <div className={styles.formError}>
              <img
                className={styles.formErrorIcon}
                aria-hidden="true"
                src={errorIcon}
                alt=""
                width={18}
                height={18}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-email">
                {errorMsgs.email}
              </p>
            </div>
          )}
        </div>

        {/* Password */}
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="password">
            Password (required)
          </label>

          <div className={styles.formValid}>
            <input
              className={styles.formInput}
              id="password"
              name="password"
              type="password"
              min={8}
              placeholder="Seinfeld#89"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
              required
              value={loginFormData.password}
              onChange={handlePasswordChange}
            />
            {validFormData.password && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkIcon}
                alt=""
                width={25}
                height={25}
              />
            )}
          </div>
          {validFormData.password === false && (
            <div className={styles.formError}>
              <img
                className={styles.formErrorIcon}
                aria-hidden="true"
                src={errorIcon}
                alt=""
                width={18}
                height={18}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-password">
                {errorMsgs.password}
              </p>
            </div>
          )}
        </div>

        {/* Log-in button */}
        <Button
          className="btnLogin"
          title="Login"
          type="submit"
          disabled={isFormSubmitted}>
          {isFormSubmitted ? 'Logging in...' : 'Get Started'}
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
