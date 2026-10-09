/* -------------------- Styles -------------------- */
import styles from './CommentCard.module.css'
/* -------------------- Icons -------------------- */
import profileIcon from '../../../assets/icons/icon-profile-2.svg'
import expandIcon from '../../../assets/icons/icon-expand.svg'
/* -------------------- Hooks -------------------- */
import { useContext } from 'react'
/* -------------------- Contexts -------------------- */
import { AuthContext } from '../../../contexts/auth/AuthContext'
/* -------------------- Components -------------------- */
import Button from '../../core/button/Button'

const CommentCard = (props) => {
  const { currentUser } = useContext(AuthContext)

  const {
    comment,
    commentId,
    handleEditComment,
    handleDeleteComment,
    handleToggle,
    isActive,
    isDelete,
    deleteErrorMsg,
  } = props

  // Date for 'datetime' attribute
  const date = comment.createdAt
  const validGlobalDate = date.replace('T', ' ')

  // Format 'dateCreated' for display
  const dateCreated = new Date(comment.createdAt).toLocaleString()

  return (
    <>
      <li className={styles.card}>
        <div className={styles.imgContainer}>
          {/* Profile icon  */}
          <img
            className={styles.profileIcon}
            src={profileIcon}
            alt=""
            width={30}
            height={30}
          />
        </div>
        <div className={styles.commentContainer}>
          <div className={styles.header}>
            <div className={styles.nameContainer}>
              {/* Author name  */}
              <p>
                <strong>{comment?.author?.name}</strong>
              </p>
              {/* Commented on date  */}
              <time className={styles.date} datetime={validGlobalDate}>
                {dateCreated}
              </time>
            </div>
            {comment.authorId === currentUser?.id && (
              <div className={styles.commentOptions}>
                {/* Button to toggle Edit and Delete buttons  */}
                <Button
                  onClick={() => handleToggle(comment.id)}
                  className="btnToggle"
                  title="Buttons"
                  ariaLabel="Comment options">
                  <img src={expandIcon} alt="" width={20} height={20} />
                </Button>

                {/* Dropdown buttons */}
                {/* Show buttons only for the matching comment  */}
                <ul
                  className={
                    isActive && comment.id === commentId
                      ? styles.open
                      : styles.dropdownList
                  }>
                  <li className={styles.dropdownItem}>
                    {/* Edit button  */}
                    <Button
                      className="btnEdit"
                      title="Edit comment"
                      onClick={() => handleEditComment(comment.id)}>
                      Edit
                    </Button>
                  </li>
                  <li className={styles.dropdownItem}>
                    {/* Delete button  */}
                    <Button
                      className="btnDelete"
                      title="Delete comment"
                      onClick={() => handleDeleteComment(comment.id)}>
                      Delete
                    </Button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Content  */}
          <p className={styles.content}>{comment.content}</p>
          {/* Error message  */}
          {isDelete === false && comment.id === commentId && (
            <p className={styles.errorMsg}>{deleteErrorMsg}</p>
          )}
        </div>
      </li>
    </>
  )
}

export default CommentCard
