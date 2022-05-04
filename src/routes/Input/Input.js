import { useState } from "react"
import styles from "./Input.module.scss"

export default function Input(){
  const [btnActive, setBtnActive] = useState(false);
  const [inputValue, setInputValue] = useState({ mail: "", pw: "" })
  const [invalidShow, setInvalidShow] = useState(false)

  const { mail, pw } = inputValue;
  const emailRegex =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
  const emailChecking = emailRegex.test(inputValue.mail)

  const pwShowHandler = () => {
    setBtnActive(!btnActive)
  };

  const invalidShowHandler = () => {
    if (mail.length && !emailChecking) setInvalidShow(true)
  };

  const invalidHideHandler = () => {
    if (emailChecking) setInvalidShow(false)
  };

  const addInputValues = (event) => {
    const { name, value } = event.target;
    const nextInput = { ...inputValue, [name]: value }
    setInputValue(nextInput)

    invalidHideHandler()
  }

  return (
    <div className={styles.Input}>
      <h1 className={styles.title}>4. Input</h1>
      <div className={styles.container}>
        <p className={styles.inputTitle}>E-mail</p>
        <div className={styles.inputWrap}>
          <input
            name="mail"
            valus={mail}
            type="text"
            placeholder="E-mail"
            onChange={addInputValues}
          />
          <div
            className={styles.inputIcon}
            name="checkBtn"
            style={{
              background: emailChecking
                ? "center / contain no-repeat url(/images/email_check_on.png)"
                : "center / contain no-repeat url(/images/email_check_off.png)",
            }}
          />
        </div>
        {invalidShow && <p className={styles.warning}>invalid e-mail address.</p>}
      </div>
      <div className={styles.container}>
        <p className={styles.inputTitle}>Password</p>
        <div className={styles.inputWrap}>
          <input
            name="pw"
            value={pw}
            type={btnActive ? "text" : "password"}
            placeholder="Password"
            onChange={addInputValues}
            onFocus={invalidShowHandler}
          />
          <button
            type='button'
            className={`${styles.inputIcon} ${styles.inputEyeIcon}`}
            name="eyeBtn"
            style={{
              cursor: pw.length ? "pointer" : "default",
              background: btnActive
                ? "center / contain no-repeat url(/images/pw_show.png)"
                : "center / contain no-repeat url(/images/pw_hide.png)",
            }}
            onClick={pwShowHandler}
            disabled={!pw.length}
          >버튼</button>
        </div>
      </div>
    </div>
  )
}
