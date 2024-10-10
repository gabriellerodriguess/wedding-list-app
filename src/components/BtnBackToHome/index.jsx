import React from "react"
import { Link } from "react-router-dom"
import { FaAngleLeft } from 'react-icons/fa'
import './styles.css'

export default function BtnBackToHome() {
    return (
        <Link to="/" className="back-to-home">
            <p>
                <FaAngleLeft size={14} />
                voltar
            </p>
        </Link>
    )
}