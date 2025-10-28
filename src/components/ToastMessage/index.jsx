import React, { useEffect, useState } from "react";
import { FaExclamationCircle, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import './styles.css'

const ToastMessage = ({
  text,
  status,
  timer = 5000
}) => {
  const [visible, setVisible] = useState(true)
  const [fadeClass, setFadeClass] = useState('')

  useEffect(() => {
    if (!text) return

    setVisible(true);

    const timeout = setTimeout(() => {
      setFadeClass('')
      setVisible(false);
    }, timer)

    setTimeout(() => {
      setFadeClass('show')
    }, 100);


    return () => clearTimeout(timeout);

  }, [text, timer])


  if (!visible) return null

  return (
    <div className={`toast_message ${status} ${fadeClass}`}>
      <span>
        {
          status === 'error' && <FaTimesCircle />
        }
        {
          status === 'success' && <FaCheckCircle />
        }
        {
          status === 'danger' && <FaExclamationCircle />
        }
      </span>
      <div className="toast_message--texts">
        <h1>
          {(status === 'error' || status === 'warning') && 'Oops!'}
          {status === 'success' && 'Sucesso!'}
        </h1>
        <p> {text} </p>
      </div>
    </div>
  )
}

export default ToastMessage