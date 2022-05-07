import { useState } from 'react'
import styles from './Toggle.module.scss'

export default function Toggle() {
  const [btnActive, setbtnActive] = useState(true)

  const btnHandler = (event) => {
    setbtnActive(event.target.innerHTML === '기본')
  }

  return (
    <section className={styles.Toggle}>
      <h1 className={styles.title}>1. Toggle</h1>
      <div className={styles.container}>
        <div className={btnActive ? styles.btnBgDefault : styles.btnBgDetail} />
        <button
          type='button'
          className={btnActive ? styles.actionBtnDetail : styles.actionBtnDefault}
          onClick={btnHandler}
        >
          기본
        </button>
        <button
          type='button'
          className={btnActive ? styles.actionBtnDefault : styles.actionBtnDetail}
          onClick={btnHandler}
        >
          상세
        </button>
      </div>
    </section>
  )
}
