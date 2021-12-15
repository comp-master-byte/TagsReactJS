import React from 'react'
import styles from './MyInput.module.scss'

export const MyInput = React.forwardRef((props,ref ) => {
    return (
        <input ref={ref}  className={styles.myInput} {...props}/>
    )
})
