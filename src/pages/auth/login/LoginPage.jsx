/* -------------------- Styles -------------------- */
import styles from './LoginPage.module.css'
/* -------------------- Icons -------------------- */
import loginIcon from '../../../assets/icons/icon-login-10.svg'
/* -------------------- Hooks -------------------- */
import { useState } from 'react'
import { useLocation } from 'react-router'
/* -------------------- Components -------------------- */
// import LoginForm from '../../../components/forms/auth/login/LoginForm'
import { Link } from 'react-router'

/* Login page */
const LoginPage = () => {
  // Get state from signup form using location object
  const location = useLocation()

  // State
  const [flashMsg] = useState(location.state?.message || '')

  return (
    <main>
      <title>Textura | Login</title>

      <div className={styles.login}>
        <div className={styles.loginWrapper}>
          {/* Login icon  */}
          <div className={styles.imgContainer}>
            <img src={loginIcon} alt="" width={40} height={40} />
          </div>
          {/* Heading section  */}
          <div className={styles.headingContainer}>
            <h2 className={styles.heading}>Login</h2>
            {flashMsg ? (
              <p>{flashMsg}</p>
            ) : (
              <p>Login to access your account and more features</p>
            )}
          </div>

          {/* Login form  */}
          <div className={styles.formContainer}>
            {/* <loginForm /> */}
            <div>Login Form</div>
            <p className={`${styles.textSmall} ${styles.textSignup}`}>
              Don't have an account?{' '}
              <Link className={styles.linkSignup} to={'/signup'}>
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
