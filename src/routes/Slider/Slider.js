import { useEffect, useState } from 'react'
import styles from './Slider.module.scss'

const RANGE_BRANCH = [
  { id: 1, percent: 1 },
  { id: 2, percent: 25 },
  { id: 3, percent: 50 },
  { id: 4, percent: 75 },
  { id: 5, percent: 100 },
]

export default function Slider() {
  const [value, setValue] = useState(1)
  const [dotActive, setDotActive] = useState('')

  const percentValueHandler = (event) => {
    setValue(event.target.value)
  }

  const percentBranchMoving = (percent) => {
    setValue(percent)
  }

  useEffect(() => {
    const percentChecking = RANGE_BRANCH.map((el) => el.percent <= value)
    setDotActive(percentChecking)
  }, [value])

  return (
    <div className={styles.Slider}>
      <h1 className={styles.title}>3. Slider</h1>
      <div className={styles.container}>
        <div className={styles.percentWrap}>
          <span className={styles.percent}>{value}</span>
          <span className={styles.sign}>%</span>
        </div>
        <div className={styles.rangeWrap}>
          <div className={styles.inputWrap}>
            <input
              className={styles.rangeBar}
              type='range'
              name='rangeInput'
              min='1'
              max='100'
              value={value}
              onChange={(event) => percentValueHandler(event)}
            />
            <div className={styles.progressBarUpper}>
              <div className={styles.progressBarLow} style={{ right: `-${value}%` }} />
            </div>
          </div>
          <ul className={styles.dotBranchs}>
            {RANGE_BRANCH.map((el) => (
              <li
                className={styles.dotBranch}
                key={el.id}
                style={{
                  background: dotActive[el.id - 1] ? '#49b0ae' : '#ddd',
                }}
              />
            ))}
          </ul>
        </div>
        <ul className={styles.percentLabels}>
          {RANGE_BRANCH.map((el) => (
            <li key={el.id}>
              <button type='button' className={styles.percentLabel} onClick={() => percentBranchMoving(el.percent)}>
                {el.percent}%
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
