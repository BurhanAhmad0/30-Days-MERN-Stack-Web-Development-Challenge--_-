import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext/UserContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './profile.module.css';

const Profile = () => {

    const { user } = useContext(UserContext);

    const [ProfileEdit, setProfileEdit] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleProfileEdit = () => {
        setProfileEdit(!ProfileEdit);
    };

    const onSubmit = async (data) => {
        try {

            const transformedData = {
                username: data.username,
                email: data.email,
                user_address: {
                    StreetAddress: data.streetAddress,
                    Apartment: data.apartment,
                    PostCode: data.postCode,
                }
            };

            const response = await axios.put(
                `http://localhost:3000/api/register/${user.id}`, transformedData,
                {
                    withCredentials: true
                }
            );
            if (response.status === 200) {
                console.log('Profile updated successfully:', response.data);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
        setProfileEdit(!ProfileEdit);
    };

    const handleAccountDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/register/${user.id}`, {
                withCredentials: true
            });
            if (response.status === 200) {
                console.log('Account deleted successfully:', response.data);
                // Optionally, redirect or perform additional actions after account deletion
            }
        }
        catch (error) {
            console.error('Error deleting account:', error);
        }
    }

    return (
        <>
            {ProfileEdit ? (
                <div className={styles.container}>
                    <div className={styles.card}>
                        <img src={'https://i.pravatar.cc/150?img=3'} alt="User Avatar" className={styles.avatar} />
                        <h2 className={styles.username}>@{user.username}</h2>
                        <p className={styles.email}>{user.email}</p>
                        <p className={styles.text}>{user.user_address.StreetAddress}</p>
                        <p className={styles.text}>{user.user_address.Apartment}</p>
                        <p className={styles.text}>{user.user_address.PostCode}</p>
                        <div className={styles.btnWrapper}>
                            <button className={styles.button} onClick={() => handleProfileEdit()}>Edit Profile</button>
                            <button className={styles.button} onClick={() => handleAccountDelete()}>Delete Account</button>
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <label htmlFor="username" className={styles.label}>Username</label>
                    <input
                        {...register('username')}
                        defaultValue={user.username}
                        className={styles.input}
                    />

                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        {...register('email')}
                        defaultValue={user.email}
                        className={styles.input}
                    />

                    <label htmlFor="streetAddress" className={styles.label}>Street Address</label>
                    <input
                        {...register('streetAddress')}
                        defaultValue={user.user_address.StreetAddress}
                        className={styles.input}
                    />

                    <label htmlFor="apartment" className={styles.label}>Apartment</label>
                    <input
                        {...register('apartment')}
                        defaultValue={user.user_address.Apartment}
                        className={styles.input}
                    />

                    <label htmlFor="postCode" className={styles.label}>Post Code</label>
                    <input
                        {...register('postCode')}
                        defaultValue={user.user_address.PostCode}
                        className={styles.input}
                    />

                    <button type="submit" className={styles.button}>Update Profile</button>
                </form>
            )}
        </>
    );
}

export default Profile;
