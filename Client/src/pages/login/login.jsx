import styles from './Login.module.css';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';

const Login = () => {

    const Schema = yup.object({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(Schema),
        mode: 'onChange' // ensures immediate validation feedback
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/login',
                {
                    email: data.email,
                    password: data.password
                },
                {
                    withCredentials: true
                }
            );

            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2 className={styles.title}>Login</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input {...register('email')} type="email" />
                    <p>{errors.email?.message}</p>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input {...register('password')} type="password" />
                    <p>{errors.password?.message}</p>
                </div>
                <button type="submit" className={styles.button}>Log In</button>
            </form>
        </div>
    );
};

export default Login;
