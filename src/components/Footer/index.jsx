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
                <p>O evento será no dia <strong>19/04/2025</strong> às <strong>16:00h</strong></p>
                <p>No endereço: <strong> Sevilha Casa de Festas</strong></p>
            </div>
            {/* <div className='container_footer'>
                <div className='container_footer-text'>
                    <h1>Faltam dias</h1>
                </div>
                <div className='container_footer-date'>
                    <h2>{createDate()}</h2>
                </div>
            </div> */}
        </footer>
    )
}