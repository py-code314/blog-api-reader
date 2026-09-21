/* -------------------- Styles -------------------- */
import styles from './Home.module.css'
/* -------------------- Components -------------------- */
import Hero from '../../components/sections/hero/Hero'


/* Component to display homepage */
const Home = () => {
  return (
    <>
      <main className={styles.home}>

        <Hero/>
      </main>
    </>
  )
}

export default Home
