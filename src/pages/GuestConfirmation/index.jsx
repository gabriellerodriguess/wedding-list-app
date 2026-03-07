import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import InputMask from 'react-input-mask'
import { FaSpinner } from "react-icons/fa"
import { api } from '../../services/api'
import { FaPhoneAlt } from "react-icons/fa"
import { FaChildren, FaPerson } from "react-icons/fa6"
import SvgComponentClose from '../../assets/SvgComponentClose'
import ToastMessage from '../../components/ToastMessage'
import { urlParamsFormatted } from '../../utils/searchParams'
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
  const [guestAlreadyExists, setGuestAlreadyExists] = useState(false)
  const [modalConfig, setModalConfig] = useState({ open: false, action: null })
  const [accessForm, setAccessForm] = useState(false)

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

    setOpenModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const registeredGuests = JSON.parse(localStorage.getItem("registeredGuests")) || []
    const eventId = urlParamsFormatted
    const guestIndex = registeredGuests ? registeredGuests.findIndex(guest => String(guest.event_id) === String(eventId)) : null

    if (modalConfig.action === 'create') {
      api.post('/guests', {
        ...formData,
        event_id: urlParamsFormatted
      })
        .then(response => {
          if (response.status === 200) {
            const guest = response.data.guest
            registeredGuests.push(guest);

            localStorage.setItem('registeredGuests', JSON.stringify(registeredGuests))

            handleSubmitActions('create')
          }
        })
        .catch(() => {
          setLoading(false);
          setToast({ text: 'Ocorreu um erro ao enviar sua confirmação. Tente novamente.', status: 'error' });
        });
    }

    if (modalConfig.action === 'edit') {
      const updatedGuest = { ...registeredGuests[guestIndex], ...formData }

      api.patch(`/guests/${updatedGuest.id}`, updatedGuest).then((response) => {
        const newGuestsArray = [...registeredGuests]
        newGuestsArray[guestIndex] = response.data.guest

        localStorage.setItem('registeredGuests', JSON.stringify(newGuestsArray))

        handleSubmitActions('edit')
      }).catch(() => {
        setLoading(false);
        setToast({ text: 'Ocorreu um erro ao editar seus dados. Tente novamente.', status: 'error' });
      })
    }

    if (modalConfig.action === 'delete') {
      const guestSelected = registeredGuests[guestIndex]
      api.delete(`/guests/${guestSelected.id}`)
        .then(response => {
          const newGuestsArray = registeredGuests.filter(guest => guest.id !== guestSelected.id)

          localStorage.setItem('registeredGuests', JSON.stringify(newGuestsArray))

          handleSubmitActions('delete')
        })
        .catch(err => {
          console.error('Erro ao remover guest', err)
        })
    }
  }

  const handleSubmitActions = (modalConfigAction) => {
    setSuccess(true);
    setLoading(false);
    setOpenModal(false);
    setFormData({
      name: '',
      phone: '',
      on: true,
      off: false,
      adult: 1,
      children: 0,
    });

    if (modalConfigAction === 'create') {
      setToast({ text: 'Presença confirmada com sucesso!', status: 'success' });
    }

    if (modalConfigAction === 'edit') {
      setToast({ text: 'Dados alterados com sucesso!', status: 'success' });
    }
  }

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

  useEffect(() => {
    const registeredGuests = JSON.parse(localStorage.getItem("registeredGuests")) || [];
    const eventId = window.location.search.replace('?event_id=', '')

    if (!registeredGuests.length) return

    const guestFilterByEventId = registeredGuests.find(guest => guest.event_id === eventId)

    if (guestFilterByEventId) {
      setGuestAlreadyExists(true)
      setFormData(guestFilterByEventId)
    }

  }, [])

  return (
    <Layout isConfirmationPage={true} maintenance={false} event={urlParamsFormatted}>
      {
        guestAlreadyExists && !accessForm && (
          <div className="contentFormConfirmation">
            <p className='h4'>
              Você já confirmou sua presença.
            </p>
            <div className='guestContent'>
              <p>{formData.name}</p>
              <span><FaPhoneAlt /> {formData.phone}</span>
              <span><FaPerson /> Adultos: {formData.adult}</span>
              <span><FaChildren /> Crianças: {formData.children}</span>
            </div>
            <button
              onClick={() => setAccessForm(!accessForm)}
              disabled={loading} className={`button_modal primary event_id--${urlParamsFormatted} mt-4 w-100`}
              type='submit'>
              Acessar meu cadastro
            </button>
          </div>
        )
      }

      {
        (!guestAlreadyExists || accessForm) &&
        (
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
                    <label htmlFor="children">Quantidade de crianças:
                      {
                        urlParamsFormatted !== 'heitor' &&
                        <span>(acima de 7 anos)</span>
                      }
                    </label>
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
                  {
                    guestAlreadyExists ?
                      (
                        <div className='d-flex flex-column gap-2'>
                          <button
                            disabled={loading}
                            className={`button_modal primary event_id--${urlParamsFormatted}`}
                            type='submit'
                            onClick={() => setModalConfig({ open: true, action: 'edit' })}
                          >
                            {loading ? (
                              <div className="loading-icon">
                                <FaSpinner className="spinner" size={12} />
                              </div>
                            ) : (
                              'Quero editar meus dados'
                            )}
                          </button>
                          <button
                            disabled={loading}
                            className={`button_modal secondary event_id--${urlParamsFormatted}`}
                            type='submit'
                            onClick={() => setModalConfig({ open: true, action: 'delete' })}
                          >
                            {loading ? (
                              <div className="loading-icon">
                                <FaSpinner className="spinner" size={12} />
                              </div>
                            ) : (
                              'Quero cancelar minha presença'
                            )}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setModalConfig({ open: true, action: 'create' })}
                          disabled={loading} c className={`button_modal primary event_id--${urlParamsFormatted} mt-4`}
                          type='submit'>
                          Confirmar presença
                        </button>
                      )
                  }
                </form>
              ) : (
                <div className='successMsg'>
                  <p>
                    {
                      modalConfig.action === 'create' || modalConfig.action === 'edit' ?
                      'Agradecemos sua confirmação.'
                      : 'Presença desmarcada.'
                    }
                  </p>
                </div>
              )
            }
          </div>
        )
      }

      {openModal && (
        <div className="modal_container">
          <div className="modal_confirmation">
            {
              modalConfig.action === 'create' && (
                <h3>Confira os dados antes de confirmar:</h3>
              )
            }
            {
              modalConfig.action === 'edit' && (
                <h3>Confira os dados antes de editar:</h3>
              )
            }
            {
              modalConfig.action === 'delete' && (
                <h3>Deseja mesmo cancelar sua presença?</h3>
              )
            }
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
              className={`button_modal primary event_id--${urlParamsFormatted}`}
              type='submit'
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="loading-icon">
                  <FaSpinner className="spinner" size={12} />
                </div>
              ) : modalConfig?.action === 'create' ? (
                'Confirmar'
              ) : modalConfig?.action === 'edit' ? (
                'Confirmar'
              ) : modalConfig?.action === 'delete' ? (
                'Quero cancelar minha presença'
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
