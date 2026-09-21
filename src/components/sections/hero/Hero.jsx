/* -------------------- Styles -------------------- */
import styles from './Hero.module.css'
/* -------------------- Icons -------------------- */
import blogIcon from '../../../assets/icons/icon-blog.svg'
/* -------------------- Images -------------------- */
import dogImg from '../../../assets/images/phone-and-dog.jpg'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'

/* Display Hero section */
const Hero = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h2 className={styles.heading}>Thoughts, Stories, and Ideas</h2>
          <p className={styles.description}>
            In-depth essays and guides designed to spark curiosity and deepen
            your understanding of the modern web.
          </p>
          {/* Link to all posts  */}
          <Link className={styles.postsLink} to={'/posts/all'}>
            <img
              className={styles.blogIcon}
              src={blogIcon}
              alt=""
              width={22}
              height={22}
            />
            Explore articles{' '}
          </Link>
        </div>
        <div className={styles.imgContainer}>
          {/* Hero image  */}
          <img
            className={styles.dogImg}
            src={dogImg}
            alt="Dog looking at a person who is holding a cellphone"
            // width={236}
            height={236}
          />
        </div>
      </section>
    </>
  )
}

export default Hero
