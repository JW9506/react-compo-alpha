import React from 'react'
import styles from './button.module.css'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLElement>> = (props) => {
  return (
    <button className={styles.btn} {...props}>
      Upload
    </button>
  )
}

export default Button
