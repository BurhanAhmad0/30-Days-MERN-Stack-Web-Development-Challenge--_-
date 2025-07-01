import React from 'react'
import styles from './SearchBar.module.css'

const SearchBar = () => {
    return (
        <>
            <div className={styles.searchBar}>
                <input type="text" placeholder="Search..." className={styles.searchInput} />
                <button className={styles.searchButton}>Search</button>
            </div>
        </>
    )
}

export default SearchBar
