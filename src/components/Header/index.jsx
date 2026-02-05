import React from "react"
import { useNavigate, Link } from "react-router-dom"
import './styles.css'

export default function Header({
    isConfirmationPage,
    event
}) {
    const navigate = useNavigate()

    function backToHome() {
        navigate('/')
    }

    const EVENT_CONFIG = {
        hellena: {
            prefix: 'Chá da',
            name: 'Hellena',
        },
        sara: {
            prefix: '15 anos da',
            name: 'Sara',
        },
        isaac: {
            prefix: 'Chá do',
            name: 'Isaac',
        },
    }

    function handleSubtitle(event) {
        return EVENT_CONFIG[event] || null
    }

    const subtitle = handleSubtitle(event)

    console.log(subtitle, event, 'subtitle')

    return (
        <header data-event-id={event}>
            <div className='container_header'>
                <div className='container_header-title'>
                    <Link to={isConfirmationPage ? '/confirmation' : '/'} className="header-link">
                        {
                            isConfirmationPage ?
                                <>
                                    <h2>Confirmação</h2>
                                    <small>de presença</small>
                                </>
                                :
                                <>
                                    <h1>Lista</h1>
                                    <small>de convidados</small>
                                </>
                        }
                    </Link>
                </div>

                <div className='container_header-subtitle'>
                    {subtitle && (
                        <h2>
                            {subtitle.prefix}
                            <br />
                            {subtitle.name}
                        </h2>
                    )}
                </div>
            </div>

        </header>
    )
}
