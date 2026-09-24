/* -------------------- Styles -------------------- */
import styles from './SignupForm.module.css'
/* -------------------- Icons -------------------- */
import checkIcon from '../../../../assets/icons/icon-check-1.svg'
import errorIcon from '../../../../assets/icons/icon-error-11.svg'
/* -------------------- Hooks -------------------- */
import { useRef, useEffect, useState } from 'react'

/* -------------------- Components -------------------- */
import Button from '../../../core/button/Button'
/* -------------------- Functions -------------------- */
// import {
//   validateEmailInput,
//   validatePasswordInput,
//   validateConfirmPasswordInput,
//   validateNameInput,
//   displayEmptyInputErrors,
//   registerUser,
//   displaySignupServerErrors,
// } from '../../../../utils/signup/index.js'

const SignupForm = () => {
  const nameInputRef = useRef(null)

  // State variables
  const defaultSignupFormData = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  }
  const [signupFormData, setSignupFormData] = useState(defaultSignupFormData)

  const defaultValidFormData = {
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
  }
  const [validFormData, setValidFormData] = useState(defaultValidFormData)

  const defaultErrorMessages = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  }
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages)

  const [signupErrorMsg, setSignupErrorMsg] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  // const isModalOpen = activeModal === 'signup'

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }

    // TODO: Add this in SignupPage
    // Dynamically change page title
    // if (isModalOpen) {
    //   document.title = 'Scriblr | Sign-up'
    // } else {
    //   document.title = 'Scriblr'
    // }
  }, [])

  // Handle form fields
  const handleEmailChange = (e) => {
    const email = e.target.value
    const emailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/

    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      email,
    }))

    // validateEmailInput(email, setValidFormData, setErrorMessages, emailRegExp)
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value
    const passwordRegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      password,
    }))

    // validatePasswordInput(
    //   password,
    //   setValidFormData,
    //   setErrorMessages,
    //   passwordRegExp,
    // )
  }

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value
    const password = signupFormData.password
    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      confirmPassword,
    }))

    // validateConfirmPasswordInput(
    //   confirmPassword,
    //   setValidFormData,
    //   setErrorMessages,
    //   password,
    // )
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      name,
    }))

    // validateNameInput(name, setValidFormData, setErrorMessages)
  }

  // const validateForm = () => {}

  // Handle form submission
  const handleFormSubmit = async (e) => {}

  return (
    <div className={styles.signupForm}>
      {/* Display server and network errors  */}
      {signupErrorMsg && (
        <p className={styles.signupError} aria-live="polite" id="signup-error">
          {signupErrorMsg}
        </p>
      )}
      {/* Sign-up form */}
      <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
        {/* Name input */}
        <div className={styles.formControl}>
          <label htmlFor="name" className={styles.formLabel}>
            Full Name (required)
          </label>

          <div className={styles.formValid}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Cosmo Kramer"
              className={styles.formInput}
              autoComplete="name"
              value={signupFormData.name}
              onChange={handleNameChange}
              ref={nameInputRef}
            />
            {validFormData.name && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkIcon}
                alt=""
                width={40}
                height={40}
              />
            )}
          </div>
          {validFormData.name === false && (
            <div className={styles.formError}>
              <img
                className={styles.formErrorIcon}
                aria-hidden="true"
                src={errorIcon}
                alt=""
                width={25}
                height={25}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-name">
                {errorMessages.name}
              </p>
            </div>
          )}
        </div>

        {/* Email input */}
        <div className={styles.formControl}>
          <label htmlFor="email" className={styles.formLabel}>
            Email (required)
          </label>
          <p className={styles.formHint} id="email-hint">
            Eg. user_123@example.com
          </p>

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
              value={signupFormData.email}
              onChange={handleEmailChange}
            />
            {validFormData.email && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkIcon}
                alt=""
                width={40}
                height={40}
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
                width={25}
                height={25}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-email">
                {errorMessages.email}
              </p>
            </div>
          )}
        </div>

        {/* Password */}
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="password">
            Password (required)
          </label>
          <p className={styles.formHint}>
            Requires at least 8 characters, one lowercase letter (a - z), one
            uppercase letter (A - Z), one number (0 - 9), and one special
            character (!@#$%^&amp;*)
          </p>
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
              value={signupFormData.password}
              onChange={handlePasswordChange}
            />
            {validFormData.password && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkIcon}
                alt=""
                width={40}
                height={40}
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
                width={25}
                height={25}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-password">
                {errorMessages.password}
              </p>
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="confirmPassword">
            Confirm Password (required)
          </label>
          <div className={styles.formValid}>
            <input
              className={styles.formInput}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              min={8}
              placeholder="Seinfeld#89"
              required
              value={signupFormData.confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {validFormData.confirmPassword && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkIcon}
                alt=""
                width={40}
                height={40}
              />
            )}
          </div>
          {validFormData.confirmPassword === false && (
            <div className={styles.formError}>
              <img
                className={styles.formErrorIcon}
                aria-hidden="true"
                src={errorIcon}
                alt=""
                width={25}
                height={25}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-confirmPassword">
                {errorMessages.confirmPassword}
              </p>
            </div>
          )}
        </div>

        {/* Sign up button */}
        <Button
          className="btnSignup"
          title="Signup"
          type="submit"
          disabled={isFormSubmitted}>
          {isFormSubmitted ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  )
}

export default SignupForm
