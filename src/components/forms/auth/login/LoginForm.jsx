/* -------------------- Styles -------------------- */
import styles from './LoginForm.module.css'
/* -------------------- Icons -------------------- */
import checkIcon from '../../../../assets/icons/icon-check.svg'
import errorIcon from '../../../../assets/icons/icon-error-2.svg'
/* -------------------- Hooks -------------------- */
import { useRef, useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
 /* -------------------- Context -------------------- */
import { AuthContext } from '../../../../contexts/auth/AuthContext.jsx'
/* -------------------- Components -------------------- */
import Button from '../../../core/button/Button'
/* -------------------- Functions -------------------- */
import {
  validateEmailInput,
  validatePasswordInput,
  validateForm,
  loginUser,
  displayServerValidationErrors,
  displayAuthErrors,
} from '../../../../utils/auth/login/index.js'

/* Login form component */
const LoginForm = () => {
  const emailInputRef = useRef(null)
  const navigate = useNavigate()
  const {saveToken} = useContext(AuthContext)

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

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsFormSubmitted(true)
    setLoginErrorMsg('')

    // const isValid = true
    // Check for empty form inputs
    const isValid = validateForm(
      loginFormData,
      validFormData,
      setValidFormData,
      setErrorMsgs,
    )
    // console.log('🚀 ~ handleFormSubmit ~ isValid:', isValid)

    if (!isValid) {
      setIsFormSubmitted(false)
      return
    }

    try {
      // Send log-in data to server
      const response = await loginUser(loginFormData)
      // console.log('🚀 ~ handleFormSubmit ~ response:', response)

      // This will be error object or data from backend
      const data = await response.json()
      // console.log('🚀 ~ handleFormSubmit ~ data:', data)
      // console.log('🚀 ~ handleFormSubmit ~ data token:', data.token)

      if (!response.ok) {
        setIsFormSubmitted(false)

        if (response.status === 400 && data?.errors?.length > 0) {
          // Bad request and invalid form data
          displayServerValidationErrors(
            data.errors,
            setValidFormData,
            setErrorMsgs,
          )
          setLoginErrorMsg(
            data.errorMessage || 'Check form fields and try again.',
          )
        } else if (response.status === 400) {
          // Bad request
          setLoginErrorMsg(
            data?.errorMessage ||
              'Bad request. Please check input and try again.',
          )
        } else if (response.status === 401) {
          // Authentication error
          displayAuthErrors(data?.errorMsg, setValidFormData, setErrorMsgs)
          setLoginErrorMsg(
            data?.errorMessage ||
              'Authentication error. Recheck credentials and try again.',
          )
        } else if (response.status >= 500) {
          // Server error
          setLoginErrorMsg(
            data?.errorMessage || 'Server error. Please try again.',
          )
        } else {
          setLoginErrorMsg(
            data?.errorMessage || 'Login failed. Please try again.',
          )
        }

        return
      }

      // Successful submission
      if (data && data.success) {
        // Reset state
        setIsFormSubmitted(false)
        setLoginFormData(defaultLoginFormData)
        setValidFormData(defaultValidFormData)
        setErrorMsgs(defaultErrorMsgs)

        // Save token in local storage 
        saveToken(data.token)

        // Navigate to home page
        navigate('/home')
      } else {
        setIsFormSubmitted(false)
        setLoginErrorMsg(
          data?.errorMessage || 'Login failed. Please try again.',
        )
      }
    } catch (error) {
      // Network errors, DNS errors or other system errors are caught here
      console.error('Error:', error)
      setIsFormSubmitted(false)

      setLoginErrorMsg(
        'A network or unexpected error occurred. Please try again.',
      )
    } finally {
      setIsFormSubmitted(false)
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.formWrapper}>
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
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
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
                // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
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
    </div>
  )
}

export default LoginForm





// /* -------------------- Styles -------------------- */
// import styles from './LoginForm.module.css'
// /* -------------------- Icons -------------------- */
// import checkIcon from '../../../../assets/icons/icon-check.svg'
// import errorIcon from '../../../../assets/icons/icon-error-2.svg'
// /* -------------------- Hooks -------------------- */
// import { useRef, useEffect, useState, useContext } from 'react'
// import { useNavigate } from 'react-router'
//  /* -------------------- Context -------------------- */
// import { AuthContext } from '../../../../contexts/auth/AuthContext.jsx'
// /* -------------------- Components -------------------- */
// import Button from '../../../core/button/Button'
// /* -------------------- Functions -------------------- */
// import {
//   validateEmailInput,
//   validatePasswordInput,
//   validateForm,
//   loginUser,
//   displayServerValidationErrors,
//   displayAuthErrors,
// } from '../../../../utils/auth/login/index.js'

// /* Login form component */
// const LoginForm = () => {
//   const emailInputRef = useRef(null)
//   const navigate = useNavigate()
//   const {setToken} = useContext(AuthContext)

//   // State variables
//   const defaultLoginFormData = {
//     email: '',
//     password: '',
//   }
//   const [loginFormData, setLoginFormData] = useState(defaultLoginFormData)

//   const defaultValidFormData = {
//     email: null,
//     password: null,
//   }
//   const [validFormData, setValidFormData] = useState(defaultValidFormData)

//   const defaultErrorMsgs = {
//     email: '',
//     password: '',
//   }
//   const [errorMsgs, setErrorMsgs] = useState(defaultErrorMsgs)

//   const [loginErrorMsg, setLoginErrorMsg] = useState('')
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false)

//   useEffect(() => {
//     // Focus in email field after page load
//     if (emailInputRef.current) {
//       emailInputRef.current.focus()
//     }
//   }, [])

//   // Handle form fields
//   const handleEmailChange = (e) => {
//     const email = e.target.value

//     setLoginFormData((prevFormData) => ({
//       ...prevFormData,
//       email,
//     }))
//     validateEmailInput(email, setValidFormData, setErrorMsgs)
//   }

//   const handlePasswordChange = (e) => {
//     const password = e.target.value

//     setLoginFormData((prevFormData) => ({
//       ...prevFormData,
//       password,
//     }))

//     validatePasswordInput(password, setValidFormData, setErrorMsgs)
//   }

//   // Handle form submission
//   const handleFormSubmit = async (e) => {
//     e.preventDefault()
//     setIsFormSubmitted(true)
//     setLoginErrorMsg('')

//     // const isValid = true
//     // Check for empty form inputs
//     const isValid = validateForm(
//       loginFormData,
//       validFormData,
//       setValidFormData,
//       setErrorMsgs,
//     )
//     // console.log('🚀 ~ handleFormSubmit ~ isValid:', isValid)

//     if (!isValid) {
//       setIsFormSubmitted(false)
//       return
//     }

//     try {
//       // Send log-in data to server
//       const response = await loginUser(loginFormData)
//       // console.log('🚀 ~ handleFormSubmit ~ response:', response)

//       // This will be error object or data from backend
//       const data = await response.json()
//       // console.log('🚀 ~ handleFormSubmit ~ data:', data)
//       // console.log('🚀 ~ handleFormSubmit ~ data token:', data.token)

//       if (!response.ok) {
//         setIsFormSubmitted(false)

//         if (response.status === 400 && data?.errors?.length > 0) {
//           // Bad request and invalid form data
//           displayServerValidationErrors(
//             data.errors,
//             setValidFormData,
//             setErrorMsgs,
//           )
//           setLoginErrorMsg(
//             data.errorMessage || 'Check form fields and try again.',
//           )
//         } else if (response.status === 400) {
//           // Bad request
//           setLoginErrorMsg(
//             data?.errorMessage ||
//               'Bad request. Please check input and try again.',
//           )
//         } else if (response.status === 401) {
//           // Authentication error
//           displayAuthErrors(data?.errorMsg, setValidFormData, setErrorMsgs)
//           setLoginErrorMsg(
//             data?.errorMessage ||
//               'Authentication error. Recheck credentials and try again.',
//           )
//         } else if (response.status >= 500) {
//           // Server error
//           setLoginErrorMsg(
//             data?.errorMessage || 'Server error. Please try again.',
//           )
//         } else {
//           setLoginErrorMsg(
//             data?.errorMessage || 'Login failed. Please try again.',
//           )
//         }

//         return
//       }

//       // Successful submission
//       if (data && data.success) {
//         // Reset state
//         setIsFormSubmitted(false)
//         setLoginFormData(defaultLoginFormData)
//         setValidFormData(defaultValidFormData)
//         setErrorMsgs(defaultErrorMsgs)

//         // Save token in local storage 
//         setToken(data.token)

//         // Navigate to home page
//         navigate('/home')
//       } else {
//         setIsFormSubmitted(false)
//         setLoginErrorMsg(
//           data?.errorMessage || 'Login failed. Please try again.',
//         )
//       }
//     } catch (error) {
//       // Network errors, DNS errors or other system errors are caught here
//       console.error('Error:', error)
//       setIsFormSubmitted(false)

//       setLoginErrorMsg(
//         'A network or unexpected error occurred. Please try again.',
//       )
//     } finally {
//       setIsFormSubmitted(false)
//     }
//   }

//   return (
//     <div className={styles.login}>
//       <div className={styles.formWrapper}>
//         {/* Display server and network errors  */}
//         {loginErrorMsg && (
//           <p className={styles.loginError} aria-live="polite" id="login-error">
//             {loginErrorMsg}
//           </p>
//         )}
//         {/* Log-in form */}
//         <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
//           {/* Email input */}
//           <div className={styles.formControl}>
//             <label htmlFor="email" className={styles.formLabel}>
//               Email (required)
//             </label>
//             <div className={styles.formValid}>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder="cosmo.kramer@protonmail.com"
//                 className={styles.formInput}
//                 pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
//                 autoComplete="email"
//                 inputMode="email"
//                 required
//                 value={loginFormData.email}
//                 onChange={handleEmailChange}
//                 ref={emailInputRef}
//               />
//               {validFormData.email && (
//                 <img
//                   className={styles.formCheckmark}
//                   aria-hidden="true"
//                   src={checkIcon}
//                   alt=""
//                   width={25}
//                   height={25}
//                 />
//               )}
//             </div>
//             {validFormData.email === false && (
//               <div className={styles.formError}>
//                 <img
//                   className={styles.formErrorIcon}
//                   aria-hidden="true"
//                   src={errorIcon}
//                   alt=""
//                   width={18}
//                   height={18}
//                 />
//                 <p
//                   className={styles.formErrorMsg}
//                   aria-live="polite"
//                   id="invalid-email">
//                   {errorMsgs.email}
//                 </p>
//               </div>
//             )}
//           </div>
//           {/* Password */}
//           <div className={styles.formControl}>
//             <label className={styles.formLabel} htmlFor="password">
//               Password (required)
//             </label>
//             <div className={styles.formValid}>
//               <input
//                 className={styles.formInput}
//                 id="password"
//                 name="password"
//                 type="password"
//                 min={8}
//                 placeholder="Seinfeld#89"
//                 // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
//                 required
//                 value={loginFormData.password}
//                 onChange={handlePasswordChange}
//               />
//               {validFormData.password && (
//                 <img
//                   className={styles.formCheckmark}
//                   aria-hidden="true"
//                   src={checkIcon}
//                   alt=""
//                   width={25}
//                   height={25}
//                 />
//               )}
//             </div>
//             {validFormData.password === false && (
//               <div className={styles.formError}>
//                 <img
//                   className={styles.formErrorIcon}
//                   aria-hidden="true"
//                   src={errorIcon}
//                   alt=""
//                   width={18}
//                   height={18}
//                 />
//                 <p
//                   className={styles.formErrorMsg}
//                   aria-live="polite"
//                   id="invalid-password">
//                   {errorMsgs.password}
//                 </p>
//               </div>
//             )}
//           </div>
//           {/* Log-in button */}
//           <Button
//             className="btnLogin"
//             title="Login"
//             type="submit"
//             disabled={isFormSubmitted}>
//             {isFormSubmitted ? 'Logging in...' : 'Get Started'}
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default LoginForm
