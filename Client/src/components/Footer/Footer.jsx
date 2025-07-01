import React from 'react'
import styles from './Footer.module.css'

import SearchBar from '../SearchBar/SearchBar'

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.socialMedia}>
          <SearchBar />
          <p>Follow us on social media:</p>
          <ul className={styles.socialIcons}>
            <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/128/1384/1384005.png" alt="" /></a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/128/733/733579.png" alt="" /></a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/128/174/174855.png" alt="" /></a></li>
          </ul>
        </div>

        <div className={styles.copyright}>
          <h3>Footer</h3>
          <p>© 2023 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
