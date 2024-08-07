import './styles.css'

export default function Footer() {
    function createDate() {
        const today = new Date()
        const weddingDay = new Date(2024, 8, 8)
        const differenceDate = Math.abs(weddingDay.getTime() - today.getTime())
        const finalDate = Math.ceil(differenceDate / (1000 * 60 * 60 * 24))
        return finalDate
    }

    return (
        <footer>
            <div className='container_info'>
                <p>O evento será no dia <strong>08/09/2024</strong> às <strong>11h</strong></p>
                <p>No endereço: <strong>QS 116 CONJUNTO 6 LOTE 5 | Samambaia</strong></p>
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