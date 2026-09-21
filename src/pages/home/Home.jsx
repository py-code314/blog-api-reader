/* -------------------- Styles -------------------- */
import styles from './Home.module.css'
/* -------------------- Components -------------------- */
// import { Outlet } from 'react-router'
// import Header from '../../components/layouts/header/Header'
// import Footer from '../../components/layouts/footer/Footer'
// import Sidebar from '../../components/layouts/sidebar/Sidebar'

/* Component to display homepage */
const Home = () => {
  return (
    <>
      <main className={styles.home}>
        {/* <div className={styles.homepageWrapper}>
          <Header className={styles.header} />
          <Sidebar className={styles.sidebar} />
          <main className={styles.main}>
            <Outlet />
          </main>
          <Footer className={styles.footer} />
        </div> */}
        Home
      </main>
    </>
  )
}

export default Home
