import { useState } from 'react'
import styles from './Tab.module.scss'

const VEGETABLE_LIST = [
  { id: 1, name: '감자' },
  { id: 2, name: '고구마' },
  { id: 3, name: '카레라이스' },
]

export default function Tab() {
  const [btnActive, setBtnActive] = useState([true, false, false])

  const vegetableNameHandler = (id) => {
    const activeCheck = btnActive.map((el, index) => {
      return index === id - 1
    })

    setBtnActive(activeCheck)
  }

  return (
    <section className={styles.Tab}>
      <h1 className={styles.title}>2. Tab</h1>
      <div className={styles.container}>
        {VEGETABLE_LIST.map((elem, index) => (
          <button
            type='button'
            className={btnActive[index] ? styles.btnActive : styles.btnUnActive}
            key={elem.id}
            onClick={() => vegetableNameHandler(elem.id)}
          >
            {elem.name}
          </button>
        ))}
      </div>
      <div className={styles.sliderLineWrap}>
        <div
          className={styles.sliderLine}
          style={{
            transform: `translateX(${btnActive.indexOf(true) * 100}%)`,
          }}
        />
      </div>
    </section>
  )
}
