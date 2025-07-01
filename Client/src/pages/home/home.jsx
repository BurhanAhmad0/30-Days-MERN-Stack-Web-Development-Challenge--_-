import styles from './home.module.css'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <h1>Welcome to Our Application</h1>
          <p className={styles.description}>
            Organize your tasks, track your progress, and stay productive with our intuitive platform.
          </p>
          <Link className={styles.getStartedButton} to={'/register'}>
            Get Started
          </Link>
        </div>
      </div>
    </>
  )
}

export default home
