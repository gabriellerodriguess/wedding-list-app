import { useState } from 'react'
import ToastMessage from '../ToastMessage'
import './styles.css'

export default function Footer() {
    function createDate() {
        const today = new Date()
        const weddingDay = new Date(2026, 3, 26)
        const differenceDate = Math.abs(weddingDay.getTime() - today.getTime())
        const finalDate = Math.ceil(differenceDate / (1000 * 60 * 60 * 24))
        return finalDate
    }

    return (
        <footer>
            <div className='container_info'>
                <p>Data: <strong>26/04/2026</strong> às <strong>13:00h</strong></p>
                <p>Endereço: <strong>  QR 315 Conjunto N Casa 01</strong></p>
            </div>
            <div className='container_footer'>
                <div className='container_footer-text'>
                    <h1>Faltam dias</h1>
                </div>
                <div className='container_footer-date'>
                    <h2>{createDate()}</h2>
                </div>
            </div>
        </footer>
    )
}