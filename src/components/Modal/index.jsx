import { React, useState } from "react"
import SvgComponentClose from '../../assets/SvgComponentClose'
import { FaSpinner } from "react-icons/fa"
import { api } from '../../services/api'
import './styles.css'

export default function Modal(props) {
    const [guest, setGuest] = useState('')
    const [loading, setLoading] = useState(false)

    function updateData() {
        setLoading(true)
        if (guest === '') {
            alert('Insira um nome.')
            return
        }

        api.put(`items/${props.item.id}`, { guest }).then(response => {
            console.log(response, 'response')
            if (response.data.error) {
                setLoading(false)
                alert('Desculpe, tente novamente.')
                return
            }
            props.onSuccess()
            props.dispatch()
        })
    }

    return (
        <>
            <div className="modal_container">
                <div className="modal">
                    <button className="button_close" onClick={() => props.dispatch()}>
                        <SvgComponentClose />
                    </button>
                    <h3>Você escolheu seu presente!</h3>
                    <div className="form_container">
                        <label className="text_default">Escreva seu nome:</label>
                        <input type="text" value={guest} onChange={
                            (e) => {
                                setGuest(e.target.value)
                            }}>
                        </input>
                    </div>
                    <div className="description">
                        <p className="text_default">O presente escolhido foi:</p>
                        <span className="text_default notranslate" translate="no">{props.item.name}</span>
                    </div>
                    <button
                        type="submit"
                        className={`button_modal ${loading ? 'loading' : ''}`}
                        disabled={loading}
                        onClick={() => {
                            updateData()
                        }
                        }>
                        {loading && ( 
                            <div className="loading-icon">
                                <FaSpinner className="spinner" size={12}/>
                            </div>
                        )}
                        Confirmar Presente
                    </button>
                </div>
            </div>
        </>
    )
}
