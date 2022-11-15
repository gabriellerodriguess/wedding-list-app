import React from "react"
import { useNavigate } from "react-router-dom"
import './styles.css'

export default function Header() {
    const navigate = useNavigate()

    function backToHome(){
        navigate('/')
    }

    return (
        <header>
            <div className='container_header'>
                <div className='container_header-title'>
                    <a href="" onClick={() => backToHome()}>
                        <h1>Lista</h1> <small>de presentes</small>
                    </a>
                </div>

                <div className='container_header-subtitle'>
                    <h2>Gabi e Otávio</h2>
                </div>             

            </div>

        </header>
    )
}
