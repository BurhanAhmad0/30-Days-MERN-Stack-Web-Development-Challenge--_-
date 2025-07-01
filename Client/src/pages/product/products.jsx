import styles from './products.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Loader from '../../components/Loader/Loader'

const products = () => {

    const { id } = useParams()

    const [Product, setProduct] = useState(null)

    const getProduct = async () => {
        try {
            const productReq = await axios.get(`http://localhost:3000/api/products/${id}`)
            const { data } = productReq
            setProduct(data.product)
        } catch (error) {
            console.error("Failed to fetch product:", error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            {Product ? (
                <div className={styles.productContainer}>
                    <h1 className={styles.productTitle}>{Product.title}</h1>
                    <p className={styles.productDescription}>{Product.description}</p>
                </div>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default products
