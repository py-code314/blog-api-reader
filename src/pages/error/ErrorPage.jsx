/* -------------------- Styles -------------------- */
import styles from './ErrorPage.module.css'
/* -------------------- Images -------------------- */
import errorImage from '../../assets/images/error-404.svg'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'

/* Display error page */
const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.errorHeader}>
        <div className={styles.errorMsg}>
          <p>We're not sure what happened there — sorry!</p>
          <p>Check for typos, try again?</p>
        </div>
        <p>
          Back to{' '}
          <Link className={styles.linkHome} to={`/home`}>
            Home
          </Link>
        </p>
      </div>
      <div className={styles.errorBody}>
        <div className={styles.imgContainer}>
          <img className={styles.errorImage} src={errorImage} alt="" width={700} height={700} />
        </div>
      </div>
      <div className={styles.errorFooter}>
        <p className={styles.errorText}>Error</p>
      </div>
    </div>
  )
}

export default ErrorPage
