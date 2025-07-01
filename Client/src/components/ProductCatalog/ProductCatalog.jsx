import styles from './ProductCatalog.module.css'
import { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useContext } from 'react'
import { UserContext } from '../../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const ProductCatalog = () => {

    const productSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        description: yup.string().required('Description is required'),
    });

    const navigate = useNavigate()
    const { Products, currentPage, setCurrentPage, totalPages, setTotalPages } = useContext(UserContext)

    const [AddProduct, setAddProduct] = useState(false)
    const [EditMode, setEditMode] = useState(false)
    const [SelectedProductId, setSelectedProductId] = useState(null)
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors } } = useForm({
            resolver: yupResolver(productSchema),
        });

    const onSubmit = async (data) => {
        try {
            if (EditMode && SelectedProductId) {
                // Update logic
                await axios.put(
                    `http://localhost:3000/api/products/${SelectedProductId}`,
                    {
                        title: data.title,
                        description: data.description,
                    },
                    {
                        withCredentials: true
                    }
                )
            } else {
                // Add logic
                await axios.post(
                    `http://localhost:3000/api/products`,
                    {
                        title: data.title,
                        description: data.description,
                    },
                    {
                        withCredentials: true
                    }
                )
            }

            // Reset state
            reset()
            setAddProduct(false)
            setEditMode(false)
            setSelectedProductId(null)
        } catch (error) {
            console.error("Error submitting form:", error)
        }
    }

    const handleDelete = async (id) => {
        const deleteReq = await axios.delete(`http://localhost:3000/api/products/${id}`)
        console.log(deleteReq)
    }

    const handleUpdate = (id) => {
        const selected = Products.find(product => product.id === id)

        if (selected) {
            setValue("title", selected.title)
            setValue("description", selected.description)
            setSelectedProductId(id)
            setEditMode(true)
            setAddProduct(true)
        }
    }

    return (
        <>
            <div className={styles.productCatalog}>

                <div className={styles.addNewProduct}>
                    <button onClick={() => setAddProduct(true)} className={styles.addButton}>Add Product</button>
                </div>

                {AddProduct && (
                    <div className={styles.addProductCard}>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.addProductForm}>
                            <input
                                className={styles.addProductTitle}
                                type="text"
                                placeholder="Title"
                                {...register("title", { required: true })}
                            />
                            {errors.title && <p className={styles.error}>{errors.title.message}</p>}

                            <textarea
                                className={styles.addProductDescription}
                                placeholder="Description"
                                {...register("description", { required: true })}
                                draggable="false"
                            />
                            {errors.description && <p className={styles.error}>{errors.description.message}</p>}

                            <button className={styles.addButton} type="submit">
                                {EditMode ? "Update Product" : "Add Product"}
                            </button>
                        </form>
                    </div>
                )}

                <ErrorBoundary>
                    {Products.map((product, index) => (
                        // <div onClick={() => navigate(`/products/${product.id}`)} id={product.id} key={index} className={styles.productCard}>
                        //     <h2 className={styles.productTitle}>{product.title}</h2>
                        //     <p className={styles.productDescription}>
                        //         {product.description}
                        //     </p>
                        // </div>

                        // <div onClick={() => handleDelete(product.id)} id={product.id} key={index} className={styles.productCard}>
                        //     <h2 className={styles.productTitle}>{product.title}</h2>
                        //     <p className={styles.productDescription}>
                        //         {product.description}
                        //     </p>
                        // </div>

                        // <div onClick={() => handleUpdate(product.id)} id={product.id} key={index} className={styles.productCard}>
                        //     <h2 className={styles.productTitle}>{product.title}</h2>
                        //     <p className={styles.productDescription}>
                        //         {product.description}
                        //     </p>
                        // </div>

                        <div onClick={() => navigate(`/products/${product.id}`)} id={product.id} key={index} className={styles.productCard}>
                            <h2 className={styles.productTitle}>{product.title}</h2>
                            <p className={styles.productDescription}>
                                {product.description}
                            </p>
                        </div>
                    ))}
                </ErrorBoundary>

                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Prev</button>

                <div className={styles.pagination}>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>

            </div>
        </>
    )
}

export default ProductCatalog
