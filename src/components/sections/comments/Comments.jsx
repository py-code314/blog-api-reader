/* -------------------- Styles -------------------- */
import styles from './Comments.module.css'
/* -------------------- Icons -------------------- */
import profileIcon from '../../../assets/icons/icon-profile-2.svg'

/* Show list of comments */
const Comments = ({ comments, author }) => {
  // console.log('🚀 ~ Comments ~ comments:', comments)

  return (
    <>
      <div className={styles.comments}>
        {comments?.length === 0 ? (
          <p>Be the first one to add a comment.</p>
        ) : (
          <ul className={styles.list}>
              {comments?.map((comment) => (
              // Comment 
              <li className={styles.card} key={comment.id}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.profileIcon}
                    src={profileIcon}
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>
                <div className={styles.commentContainer}>
                  <p><strong>{author.name}</strong></p>
                  <p className={styles.content}>{comment.content}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Comments
