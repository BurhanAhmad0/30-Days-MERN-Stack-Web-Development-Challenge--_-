import styles from './count.module.css'

import Count from "../../components/Count/Count"
import ProductCatalog from "../../components/ProductCatalog/ProductCatalog"

const count = () => {
    return (
        <>
            <div className={styles.count}>
                <h1>REACT APP</h1>
                <p>This is a simple React application.</p>
                <p>It uses Vite for development and build.</p>
                <p>It uses Tailwind CSS for styling.</p>
                <p>It uses React Router for routing.</p>
                <p>It uses React Query for data fetching.</p>
                <p>It uses React Testing Library for testing.</p>
                <p>It uses Vitest for testing.</p>

                <Count />
                <ProductCatalog />
            </div>
        </>
    )
}

export default count
