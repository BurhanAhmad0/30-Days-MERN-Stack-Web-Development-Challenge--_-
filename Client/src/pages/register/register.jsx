import styles from './register.module.css';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';

const Register = () => {

    const Schema = yup.object({
        username: yup.string().required('Username is required').min(4, 'Min length is 4').max(25, 'Max length is 25'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required'),
        userRole: yup.string().oneOf(['user', 'admin'], 'Invalid user type').default('user'),
        StreetAddress: yup.string().required('Street Address is required'),
        Apartment: yup.string().nullable(),
        PostCode: yup.string().required('Post Code is required'),
    });

    const [LoginfFormStep, setLoginfFormStep] = useState(1);
    const [isStepValid, setisStepValid] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(Schema),
        mode: 'onChange' // ensures immediate validation feedback
    });

    const values = watch();

    const onSubmit = async (data) => {
        console.log('Form data:', data);
        try {
            const response = await axios.post(
                'http://localhost:3000/api/register',
                {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    userRole: data.userRole,
                    StreetAddress: data.StreetAddress,
                    Apartment: data.Apartment,
                    PostCode: data.PostCode
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

    const handleFormStep = async (e) => {
        if (e.target.id === 'PreviousButton' && LoginfFormStep >= 2) {
            setLoginfFormStep(LoginfFormStep - 1);
        }

        if (e.target.id === 'NextButton' && LoginfFormStep <= 2) {

            if (LoginfFormStep === 1) {
                setisStepValid(await trigger(['username', 'email']));
            } else if (LoginfFormStep === 2) {
                setisStepValid(await trigger(['StreetAddress', 'PostCode']));
            }

            if (isStepValid) {
                setLoginfFormStep(LoginfFormStep + 1);
            }
        }
    };

    const handleProgressBar = () => {
        const progessBar = document.getElementById('progessBar');

        switch (LoginfFormStep) {
            case 1:
                progessBar.style.width = '25%'
                break;
            case 2:
                progessBar.style.width = '70%'
                break;
            case 3:
                progessBar.style.width = '100%'
                break;
            default:
                progessBar.style.width = '0%'
                break;
        }
    }

    useEffect(() => {
        handleProgressBar()
    }, [LoginfFormStep])


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.RegisterForm}>
            {/* Step 1 */}
            <div className={`${styles.step1} ${LoginfFormStep === 1 ? styles.step1Show : styles.step1Hide}`}>

                <div className={styles.roleSelectWrapper}>
                    <label htmlFor="role">Role <sup>*</sup></label>
                    <select id="role" {...register("userRole")} className={styles.selectInput}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <p className={styles.error}>{errors.role?.message}</p>
                </div>

                <label htmlFor="username">Username <sup>*</sup></label>
                <input {...register("username")} name="username" type="text" />
                <p>{errors.username?.message}</p>

                <label htmlFor="email">Email <sup>*</sup></label>
                <input {...register("email")} name="email" type="email" />
                <p>{errors.email?.message}</p>

                <label htmlFor="password">Password <sup>*</sup></label>
                <input {...register("password")} name="password" type="password" />
                <p>{errors.password?.message}</p>
            </div>

            {/* Step 2 */}
            <div className={`${styles.step2} ${LoginfFormStep === 2 ? styles.step2Show : styles.step2Hide}`}>
                <label htmlFor="StreetAddress">Street Address <sup>*</sup></label>
                <input {...register("StreetAddress")} name="StreetAddress" type="text" />
                <p>{errors.StreetAddress?.message}</p>

                <label htmlFor="Apartment">Apartment</label>
                <input {...register("Apartment")} name="Apartment" type="text" />
                <p>{errors.Apartment?.message}</p>

                <label htmlFor="PostCode">Post Code <sup>*</sup></label>
                <input {...register("PostCode")} name="PostCode" type="text" />
                <p>{errors.PostCode?.message}</p>
            </div>

            {/* Step 3 */}
            <div className={`${styles.step3} ${LoginfFormStep === 3 ? styles.step3Show : styles.step3Hide}`}>
                <div className={styles.previewItem}>
                    <h3>Username:</h3>
                    <p>{values.username}</p>
                </div>
                <div className={styles.previewItem}>
                    <h3>Email:</h3>
                    <p>{values.email}</p>
                </div>
                <div className={styles.previewItem}>
                    <h3>Password:</h3>
                    <p>{values.password}</p>
                </div>
                <div className={styles.previewItem}>
                    <h3>Street Address:</h3>
                    <p>{values.StreetAddress}</p>
                </div>
                <div className={styles.previewItem}>
                    <h3>Post Code:</h3>
                    <p>{values.PostCode}</p>
                </div>
            </div>

            {/* Navigation */}
            <div className={styles.registerHead}>
                <button id='PreviousButton' type='button' onClick={handleFormStep}>Previous</button>
                {
                    (LoginfFormStep === 3)
                        ? <button type='submit'>Submit</button>
                        : <button id='NextButton' type='button' onClick={handleFormStep} className={`${(!isStepValid) && styles.buttonDisabled}`}>Next</button>
                }
            </div>
        </form>
    );
};

export default Register;
