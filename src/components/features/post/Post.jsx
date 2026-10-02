/* -------------------- Styles -------------------- */
import styles from './Post.module.css'
/* -------------------- Icons -------------------- */
import backIcon from '../../../assets/icons/icon-back.svg'
/* -------------------- Hooks -------------------- */
import { useNavigate } from 'react-router'
import { useFetchData } from '../../../hooks/useFetchData.js'
/* -------------------- Components -------------------- */
import { useParams } from 'react-router'
import ErrorMessage from '../../core/error/ErrorMessage.jsx'
import Button from '../../core/button/Button.jsx'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

/* Show post details */
const Post = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  // Get a single post data
  const { data, isLoading, error } = useFetchData(
    `http://localhost:8080/api/v1/posts/${postId}`,
  )

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.post}>
        <h2 className={styles.heading}>Post</h2>
        <div className={styles.loader}></div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.post}>
        <h2 className={styles.heading}>Post</h2>
        <ErrorMessage error={error} />
      </div>
    )

  // Go back one page when Back btn is clicked
  const handleBackClick = () => {
    navigate(-1)
  }

  // Destructure data
  // Add default values to prevent null errors
  const { post = {} } = data || {}
  const {
    categories = [],
    title = '',
    content = '',
    createdAt = '',
    updatedAt = '',
    tags = [],
  } = post

  // Computed variables
  const dateCreated = new Date(createdAt).toLocaleString()
  const dateUpdated = new Date(updatedAt).toLocaleString()

  let postCategories = categories.map((category) => category.name)
  postCategories = postCategories.join(', ')

  let postTags = tags.map((tag) => tag.name)
  postTags = postTags.join(', ')

  return (
    <>
      <div className={styles.post}>
        <title>Textura | Post</title>

        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>{title}</h2>

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
        </div>
        {/* Post details  */}
        <div className={styles.details}>
          <p>
            <strong>Created on:</strong> {dateCreated}
          </p>
          <p>
            <strong>Updated on:</strong> {dateUpdated}
          </p>
          <p>
            <strong>Categories:</strong> {postCategories}
          </p>
        </div>
        <div className={styles.content}>{parse(content)}</div>
        <p>
          <strong>Tags:</strong> {postTags}
        </p>
      </div>
    </>
  )
}

export default Post
