/* -------------------- Styles -------------------- */
import styles from './RecentPosts.module.css'
/* -------------------- Icons -------------------- */
// import errorIcon from '../../../assets/icons/icon-error-1.svg'
import readMoreIcon from '../../../assets/icons/icon-chevron-right-1.svg'
/* -------------------- Hooks -------------------- */
import { useData } from '../../../hooks/useData'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

/* Show previews of recent posts */
const RecentPosts = () => {
  // Get recent posts data
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/posts/latest',
  )

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error) return <div>{error}</div>

  const { posts } = data

  return (
    <>
      <section className={styles.recentPosts}>
        <h2 className={styles.heading}>Recent Posts</h2>
        <ul className={styles.list}>
          {posts.length === 0 ? (
            <p>No posts to show yet.</p>
          ) : (
            posts.map((post) => (
              <li className={styles.post} key={post.id}>
                <div className={styles.imgContainer}></div>
                <div>
                  <h3>{post.title}</h3>
                  <p className={styles.content}>{parse(post.content)}</p>
                  {/* Link to view full post  */}
                  <Link className={styles.readMoreLink} to={`/posts/${post.id}`}>
                    Read more
                    <img src={readMoreIcon} alt="" width={20} height={20} />
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </>
  )
}

export default RecentPosts
