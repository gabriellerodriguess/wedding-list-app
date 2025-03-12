import React, { useState } from 'react'
import Layout from '../../components/Layout'
import InputMask from 'react-input-mask'
import { FaSpinner } from "react-icons/fa"
import { api } from '../../services/api'
import './styles.css'

const GuestConfirmation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    on: true,
    off: false,
    adult: 0,
    children: 0
  });
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    const formattedValue = (name === 'adult' || name === 'children') ? Number(value) : value;

    if (name === 'on') {
      setFormData((prevData) => ({
        ...prevData,
        on: true,
        off: false
      }));
    } else if (name === 'off') {
      setFormData((prevData) => ({
        ...prevData,
        on: false,
        off: true
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    if (formData.name === '') {
      alert('Por favor, insira seu nome e tente novamente.');
      return;
    }

    const phoneWithoutMask = formData.phone.replace(/\D/g, '');

    if (formData.phone === '' || formData.phone === '(__) _____-____' || phoneWithoutMask.length !== 11) {
      alert('Por favor, insira um número de telefone válido e tente novamente.');
      return;
    }

    if (formData.on === null && formData.off === null) {
      alert('Por favor, escolha se você comparecerá ao evento e tente novamente.');
      return;
    }

    api.post('/guests', { ...formData }).then(response => {
      if (response.status === 200) {
        setSuccess(true)
        setLoading(false)
        setFormData({
          name: '',
          phone: '',
          on: true,
          off: false,
          adult: 0,
          children: 0
        })
      }
    })
  }

  return (
    <Layout isConfirmationPage={true}>
      <div className='contentFormConfirmation'>
        {
          !success ?
            <form onSubmit={(e) => handleSubmit(e)} className='formConfirmation'>
              <div>
                <label htmlFor="name">Nome</label>
                <input type='text' name='name' id="name" placeholder='Insira seu nome' value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="phone">Telefone</label>
                <InputMask
                  id='phone'
                  mask='(99) 99999-9999'
                  name='phone'
                  value={formData.phone}
                  placeholder="Insira seu telefone"
                  onChange={handleChange}
                />
              </div>
              <div className='inputsConfirmation'>
                <label>Você comparecerá ao evento?</label>
                <label>
                  <input
                    type="radio"
                    name="on"
                    value={formData.on}
                    checked={formData.on}
                    onChange={handleChange}
                  />
                  Sim
                </label>
                <label>
                  <input
                    type="radio"
                    name="off"
                    value={formData.off}
                    checked={formData.off}
                    onChange={handleChange}
                  />
                  Não
                </label>
              </div>
              <div className='guestsQuantity'>
                <label htmlFor="adult">Quantidade de adultos, incluindo você:</label>
                <select
                  id="adult"
                  name="adult"
                  value={formData.adult}
                  onChange={handleChange}
                  className='form-select w-auto'
                >
                  <option value="">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className='guestsQuantity'>
                <label htmlFor="children">Quantidade de crianças: <span>(acima de 7 anos)</span></label>
                <select
                  id="children"
                  name='children'
                  value={formData.children}
                  onChange={handleChange}
                  className='form-select w-auto'
                >
                  <option value="">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <button disabled={loading} className='button_modal' type='submit'>
                {loading ?
                  <div className="loading-icon">
                    <FaSpinner className="spinner" size={12} />
                  </div> :
                  <>
                    Confirmar presença
                  </>
                }
              </button>
            </form>
            :
            <div className='successMsg'>
              <p>
                Agradecemos sua confirmação.
              </p>
            </div>
        }
      </div>
    </Layout>
  )
}

export default GuestConfirmation