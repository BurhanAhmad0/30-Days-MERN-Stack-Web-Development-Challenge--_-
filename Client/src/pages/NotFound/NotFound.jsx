import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.statusCode}>404</div>
            <div className={styles.message}>Page Not Found</div>
            <Link to="/" className={styles.link}>Go back to Home</Link>
        </div>
    );
};

export default NotFound;
