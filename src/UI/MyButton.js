import React from 'react'
import styles from './MyButton.module.scss'

export const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={styles.myBtn}>
            <span className={`${styles.myBtnLine} && ${styles.myBtnLineTop}`}></span>
            <span className={`${styles.myBtnLine} && ${styles.myBtnLineRight}`}></span>
            <span className={`${styles.myBtnLine} && ${styles.myBtnLineBottom}`}></span>
            <span className={`${styles.myBtnLine} && ${styles.myBtnLineLeft}`}></span>
            {children}
        </button>
    )
}
