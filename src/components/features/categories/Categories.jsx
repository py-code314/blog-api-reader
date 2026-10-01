/* -------------------- Styles -------------------- */
import styles from './Categories.module.css'
/* -------------------- Hooks -------------------- */
import { useFetchData } from '../../../hooks/useFetchData.js'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import ErrorMessage from '../../core/error/ErrorMessage.jsx'

/* Show categories */
const Categories = () => {
  // Get all categories data
  const { data, isLoading, error } = useFetchData(
    'http://localhost:8080/api/v1/categories/all',
  )
  console.log("🚀 ~ Categories ~ data:", data)

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.categories}>
        <h2 className={styles.heading}>Categories</h2>
        <div className={styles.loader}></div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.categories}>
        <h2 className={styles.heading}>Categories</h2>
        <ErrorMessage error={error} />
      </div>
    )
  return (
    <div className={styles.categories}>
      <h2 className={styles.heading}>Categories</h2>
      {data?.categories.length === 0 ? (
        <p>🔴 No categories to show yet.</p>
      ) : (
        <ul className={styles.list}>
          {data?.categories.map((category) => (
            <Link className={styles.linkCategory} key={category.id} to={`/home/categories/${category.id}`}>
              <li className={styles.tab}>{category.name}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Categories
