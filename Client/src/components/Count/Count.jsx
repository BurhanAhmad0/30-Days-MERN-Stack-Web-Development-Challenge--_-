import styles from './Count.module.css'
import { useContext } from 'react'
import { UserContext } from '../../UserContext/UserContext'

const Count = () => {

    const { CountState, CountDispatch } = useContext(UserContext)

    return (
        <>
            <div className={styles.count}>
                <h1>COUNT</h1>
                <div className={styles.countBtns}>
                    <button onClick={() => CountDispatch({ type: 'DECREMENT' })}>-</button>
                    <p>{CountState.count}</p>
                    <button onClick={() => CountDispatch({ type: 'INCREMENT' })}>+</button>
                </div>
            </div>
        </>
    )
}

export default Count
