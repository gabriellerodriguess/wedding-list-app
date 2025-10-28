import React, { useState } from 'react'
import Layout from '../../components/Layout'
import InputMask from 'react-input-mask'
import { FaSpinner } from "react-icons/fa"
import { api } from '../../services/api'
import { FaPhoneAlt } from "react-icons/fa"
import { FaChildren, FaPerson } from "react-icons/fa6"
import SvgComponentClose from '../../assets/SvgComponentClose'
import ToastMessage from '../../components/ToastMessage'
import './styles.css'

const GuestConfirmation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    on: true,
    off: false,
    adult: 1,
    children: 0
  });
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [toast, setToast] = useState({
    text: '',
    status: '',
    timer: 4000,
    key: Date.now()
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const formattedValue = (name === 'adult' || name === 'children') ? Number(value) : value;

    if (name === 'on') {
      setFormData(prev => ({ ...prev, on: true, off: false }));
    } else if (name === 'off') {
      setFormData(prev => ({ ...prev, on: false, off: true }));
    } else {
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    }
  }

  const handleValidateForm = (e) => {
    e.preventDefault();

    const phoneWithoutMask = formData.phone.replace(/\D/g, '');

    if (formData.name.trim() === '') {
      setToast({
        text: 'Por favor, insira seu nome e tente novamente.', status: 'error', key: Date.now()
      });
      return;
    }

    if (phoneWithoutMask.length !== 11) {
      setToast({
        text: 'Por favor, insira um número de telefone válido e tente novamente.', status: 'error', key: Date.now()
      });
      return;
    }

    if (formData.on === null && formData.off === null) {
      setToast({
        text: 'Por favor, escolha se você comparecerá ao evento e tente novamente.', status: 'error', key: Date.now()
      });
      return;
    }

    setOpenModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    api.post('/guests', { ...formData })
      .then(response => {
        if (response.status === 200) {
          setSuccess(true);
          setLoading(false);
          setOpenModal(false);
          setFormData({
            name: '',
            phone: '',
            on: true,
            off: false,
            adult: 1,
            children: 0
          });
          setToast({ text: 'Confirmação enviada com sucesso!', status: 'success' });
        }
      })
      .catch(() => {
        setLoading(false);
        setToast({ text: 'Ocorreu um erro ao enviar sua confirmação. Tente novamente.', status: 'error' });
      });
  };

  const handleModal = (e) => {
    e.preventDefault();
    setToast({
      text: '',
      status: '',
      timer: 4000,
      key: Date.now()
    })
    setOpenModal(!openModal);
  };

  return (
    <Layout isConfirmationPage={true} maintenance={false}>
      <div className='contentFormConfirmation'>
        {
          !success ? (
            <form onSubmit={handleValidateForm} className='formConfirmation'>
              <div>
                <label htmlFor="name">Nome</label>
                <input
                  type='text'
                  name='name'
                  id="name"
                  placeholder='Insira seu nome'
                  value={formData.name}
                  onChange={handleChange}
                />
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
                Confirmar presença
              </button>
            </form>
          ) : (
            <div className='successMsg'>
              <p>Agradecemos sua confirmação.</p>
            </div>
          )
        }
      </div>

      {openModal && (
        <div className="modal_container">
          <div className="modal_confirmation">
            <h3>Confira os dados antes de enviar:</h3>
            <button className="button_close" onClick={handleModal}>
              <SvgComponentClose />
            </button>
            <div className='guestContent'>
              <p>{formData.name}</p>
              <span><FaPhoneAlt /> {formData.phone}</span>
              <span><FaPerson /> Adultos: {formData.adult}</span>
              <span><FaChildren /> Crianças: {formData.children}</span>
            </div>
            <button
              disabled={loading}
              className='button_modal'
              type='submit'
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="loading-icon">
                  <FaSpinner className="spinner" size={12} />
                </div>
              ) : (
                'Confirmar'
              )}
            </button>
            <div className='backToForm' onClick={handleModal}>
              <p>Voltar</p>
            </div>
          </div>
        </div>
      )}

      <ToastMessage text={toast.text} status={toast.status} key={toast.key} />
    </Layout>
  )
}

export default GuestConfirmation
