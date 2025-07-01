// components/Loader.jsx
import styles from './LoadingPage.module.css'; // Import the CSS styles

const Loader = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <h2 className={styles.loadingText}>Loading, please wait...</h2>
        </div>
    );
};

export default Loader;
