import React from 'react'
import styles from './LilButton.module.scss'

export const LilButton = ({children, ...props}) => {
    return (
        <button {...props} className={styles.myBtn}>
            {children}
        </button>
    )
}
