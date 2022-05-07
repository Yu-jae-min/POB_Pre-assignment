import { useState, useRef, useEffect } from 'react'
import styles from './Dropdown.module.scss'

const MENU_LIST = [
  { id: 1, menu: 'All Symbol' },
  { id: 2, menu: 'BTCUSD.PERP' },
  { id: 3, menu: 'ETHUSD.PERP' },
  { id: 4, menu: 'BCHUSD.PERP' },
  { id: 5, menu: 'LTCUSD.PERP' },
  { id: 6, menu: 'XRPUSD.PERP' },
  { id: 7, menu: '1000SHIBUSD.PERP' },
]

export default function Dropdown() {
  const [isShow, setIsShow] = useState(false)
  const [title, setTitle] = useState(MENU_LIST[0].menu)
  const [inputValue, setInputValue] = useState('')
  const [searchList, setSearchList] = useState(MENU_LIST)
  const searchMenu = useRef(null)

  useEffect(() => {
    const filterMenu = MENU_LIST.filter((el, index) => index === 0 || el.menu.match(new RegExp(inputValue, 'i')))

    inputValue.length > 0 ? setSearchList(filterMenu) : setSearchList(MENU_LIST)
  }, [inputValue])

  const searchMenuDisplay = () => {
    setIsShow(!isShow)
  }

  const listValueChecked = (menu) => {
    const clickedMenu = MENU_LIST.map((el) => Object.values(el).includes(menu)).indexOf(true)

    setTitle(MENU_LIST[clickedMenu].menu)
  }

  const listClickHander = (menu) => {
    listValueChecked(menu)
    searchMenuDisplay()
  }

  const inputValueHandler = (event) => {
    setInputValue(event.target.value)
  }

  const outSideClickHander = (event) => {
    if (searchMenu.current && !searchMenu.current.contains(event.target)) {
      setIsShow(false)
      setInputValue('')
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', outSideClickHander)
    return () => {
      document.removeEventListener('mousedown', outSideClickHander)
    }
  }, [searchMenu])

  return (
    <div className={styles.Dropdown}>
      <h1 className={styles.title}>5. Dropdown</h1>
      <div className={styles.container}>
        <button type='button' className={styles.defaultMenuWrap} onClick={searchMenuDisplay}>
          <span className={styles.defaultMenu}>{title}</span>
          <img className={styles.arrowIcon} alt='arrow icon' src='/assets/images/search_glass.png' />
        </button>
        {isShow && (
          <div className={styles.searchMenuWrap} ref={searchMenu}>
            <input
              className={styles.searchBox}
              placeholder='Search Symbol'
              type='text'
              value={inputValue}
              onChange={(event) => inputValueHandler(event)}
            />
            <img className={styles.searchIcon} alt='search icon' src='/assets/images/search_glass.png' />
            <ul className={styles.searchList}>
              {searchList.map((el) => (
                <button
                  type='button'
                  className={styles.searchItem}
                  key={el.id}
                  onClick={() => listClickHander(el.menu)}
                >
                  <li>{el.menu}</li>
                </button>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
