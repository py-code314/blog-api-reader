/* -------------------- Styles -------------------- */
import styles from './Posts.module.css'
/* -------------------- Icons/Images -------------------- */
import readMoreIcon from '../../../assets/icons/icon-chevron-right.svg'
import backIcon from '../../../assets/icons/icon-back-3.svg'
import typewriterImg from '../../../assets/images/typewriter.jpg'
/* -------------------- Hooks -------------------- */
import { useNavigate } from 'react-router'
import { useFetchData } from '../../../hooks/useFetchData.js'
/* -------------------- Components -------------------- */
import { Link, useParams } from 'react-router'
import ErrorMessage from '../../core/error/ErrorMessage.jsx'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'
import Button from '../../core/button/Button.jsx'

/* Show previews of posts */
const Posts = () => {
  const navigate = useNavigate()
  const { authorId, categoryId, tagId } = useParams()

  // Update api endpoint based on author id / category id / tag id
  const apiEndpoint = authorId
    ? `http://localhost:8080/api/v1/posts/authors/${authorId}`
    : categoryId
      ? `http://localhost:8080/api/v1/posts/categories/${categoryId}`
      : tagId
        ? `http://localhost:8080/api/v1/posts/tags/${tagId}`
        : 'http://localhost:8080/api/v1/posts/'

  // Get  posts
  const { data, isLoading, error } = useFetchData(apiEndpoint)
  // console.log("🚀 ~ Posts ~ data:", data)

  const isBtn = !!authorId || !!categoryId || !!tagId
  // console.log('🚀 ~ Posts ~ isBtn:', isBtn)

  // Go back one page when Back btn is clicked
  const handleBackClick = () => {
    navigate(-1)
  }

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.posts}>
        <h2 className={styles.heading}>Posts</h2>
        <div className={styles.loader}></div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.posts}>
        <h2 className={styles.heading}>Posts</h2>
        <ErrorMessage error={error} />
      </div>
    )
  return (
    <div className={styles.posts}>
      <div className={styles.headingContainer}>
        <h2 className={styles.heading}>Posts</h2>
        {isBtn && (
          <Button className="btnBack" title="Go back" onClick={handleBackClick}>
            <img
              className={styles.backIcon}
              src={backIcon}
              alt=""
              width={22}
              height={22}
            />
            Back
          </Button>
        )}
      </div>
      {data?.posts.length === 0 ? (
        <p>🔴 No posts to show yet.</p>
      ) : (
        <ul className={styles.list}>
          {data?.posts.map((post) => (
            <li className={styles.card} key={post.id}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.typewriterImg}
                  src={typewriterImg}
                  alt=""
                  height={200}
                />
              </div>
              <div className={styles.post}>
                <h3>{post.title}</h3>
                {/* Use <div> here because first element in 'post.content' is <p> and a <p> element can not be a descendant of another <p> */}
                <div className={styles.content}>{parse(post.content)}</div>
                {/* Link to view full post  */}
                <Link
                  className={styles.readMoreLink}
                  to={`/home/posts/${post.id}`}>
                  Read more
                  <img src={readMoreIcon} alt="" width={18} height={18} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Posts
