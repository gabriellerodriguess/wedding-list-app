import React from "react"
import { useNavigate, Link } from "react-router-dom"
import './styles.css'

export default function Header() {
    const navigate = useNavigate()

    function backToHome() {
        navigate('/')
    }

    return (
        <header>
            <div className='container_header'>
                <div className='container_header-title'>
                    <Link to="/" className="header-link">
                        <h1>Lista</h1> <small>de presentes</small>
                    </Link>
                </div>

                <div className='container_header-subtitle'>
                    <h2>Victória <br />e <br /> Samuel</h2>
                </div>
            </div>

        </header>
    )
}
