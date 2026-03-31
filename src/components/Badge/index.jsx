import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import './styles.css'

const Badge = ({
  value,
  text,
  successText
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();

    await navigator.clipboard.writeText(value);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={(e) => handleCopy(e)} className='badge'>
      { copied ? <span><FiCheck />{successText}</span> : <span><FiCopy />{text}</span>}
    </button>
  )
}


export default Badge