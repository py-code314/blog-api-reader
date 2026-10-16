/* -------------------- Styles -------------------- */
import styles from './Button.module.css'

/* Reusable button component */
const Button = ({ type = 'button', children, onClick, ...rest }) => {
  const { id, className, ariaLabel, title, disabled = false } = rest

  return (
    <button
      id={id}
      className={styles[className]}
      type={type}
      aria-label={ariaLabel}
      title={title}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
