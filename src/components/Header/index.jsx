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
           isaac: {
            prefix: 'Isaac',
            name: '1 aninho',
        },
    }

    function handleSubtitle(event) {
        return EVENT_CONFIG[event] || null
    }

    const subtitle = handleSubtitle(event)

    return (
        <header data-event-id={event}>
            <div className='container_header'>
                <div className='container_header-title'>
                    <Link className="header-link">
                        {
                            event === 'danyVic' ?
                                <>
                                    <h2>Chá</h2>
                                    <small>de panela</small>
                                </> :
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
                        event === 'danyVic' ?

                            <h2>
                                {subtitle.prefix}
                                <br />
                                    &
                                <br />
                                {subtitle.name}
                            </h2>
                            :
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
