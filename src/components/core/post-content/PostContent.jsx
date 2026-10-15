/* -------------------- Styles -------------------- */
import styles from './PostContent.module.css'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

// Component for previewing post content 
const PostContent = ({ content }) => {
  const parsedContent = parse(content)

  // Filter new line strings out
  const elements = parsedContent.filter(
    (item) => typeof item !== 'string' || item.trim() !== '',
  )

  const firstElementType = elements[0].type
  const firstElementText = elements[0].props.children
  const secondElementText = elements[1].props.children

  return (
    <div>
      {firstElementType === 'h2' && (
        <h4 className={styles.subHeading}>{firstElementText}</h4>
      )}
      {/* Show only first 3 lines */}
      <p className={styles.para}>{secondElementText}</p>
    </div>
  )
}

export default PostContent
