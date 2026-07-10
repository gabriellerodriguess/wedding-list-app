import React, { useState } from 'react'
import Layout from '../../components/Layout'
import InputMask from 'react-input-mask'
import { FaCopy, FaWhatsapp } from 'react-icons/fa'
import { buildInvitationLink, getWhatsAppMessage, normalizePhone } from '../../utils/invitation'
import './styles.css'

const ADMIN_STORAGE_KEY = 'adminInvitationAuthenticated'
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL || ''
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || ''

const AdminInvitation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(ADMIN_STORAGE_KEY) === 'true')
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    adult: 1,
    children: 0,
    eventId: 'kennya',
  })
  const [generatedLink, setGeneratedLink] = useState('')
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    if (
      loginData.email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase() &&
      loginData.password === ADMIN_PASSWORD
    ) {
      setError('')
      setIsAuthenticated(true)
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true')
      return
    }

    setError('Credenciais inválidas.')
  }

  const handleGenerate = (event) => {
    event.preventDefault()

    const phone = normalizePhone(formData.phone)
    if (!phone) {
      setError('Informe um telefone para gerar o convite.')
      return
    }

    const invitation = buildInvitationLink({
      eventId: formData.eventId,
      adult: Number(formData.adult || 1),
      children: Number(formData.children || 0),
      name: String(formData.name),
      phone: String(formData.phone)
    })

    setGeneratedLink(invitation)
    setIsLinkModalOpen(true)
    setError('')
  }

  const handleCopyLink = () => {
    if (!generatedLink) {
      return
    }

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(generatedLink).catch(() => {})
    }
  }

  const handleGenerateNewLink = (event) => {
    event.preventDefault()
    setIsLinkModalOpen(false)
    setGeneratedLink('')
    setError('')
  }

  const handleSendWhatsApp = (event) => {
    event.preventDefault()

    if (!generatedLink) {
      setError('Gere o link primeiro.')
      return
    }

    const phone = normalizePhone(formData.phone)
    const message = getWhatsAppMessage({ name: formData.name, link: generatedLink })
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`

    window.open(url, '_blank', 'noopener,noreferrer')

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(message).catch(() => {})
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY)
    setIsAuthenticated(false)
    setIsLinkModalOpen(false)
    setGeneratedLink('')
    setLoginData({ email: '', password: '' })
  }

  return (
    <Layout isConfirmationPage={true} maintenance={false} event="admin">
      <div className="adminInvitationContainer">
        {!isAuthenticated ? (
          <div className="adminInvitationCard">
            <h2>Painel administrativo</h2>
            <p>Entre para gerar links de confirmação.</p>
            <form onSubmit={handleLogin} className="adminInvitationForm">
              <label htmlFor="adminEmail">E-mail</label>
              <input
                id="adminEmail"
                type="email"
                value={loginData.email}
                onChange={(event) => setLoginData({ ...loginData, email: event.target.value })}
                placeholder="admin@email.com"
              />
              <label htmlFor="adminPassword">Senha</label>
              <input
                id="adminPassword"
                type="password"
                value={loginData.password}
                onChange={(event) => setLoginData({ ...loginData, password: event.target.value })}
                placeholder="********"
              />
              {error && <p className="adminInvitationError">{error}</p>}
              <button type="submit" className="button_modal primary">Entrar</button>
            </form>
          </div>
        ) : (
          <div className="adminInvitationCard">
            <div className="adminInvitationHeader">
              <h2>Gerar convite</h2>
              <button type="button" className="adminInvitationLogout" onClick={handleLogout}>Sair</button>
            </div>

            <form onSubmit={handleGenerate} className="adminInvitationForm">
              <label 
                style={{ 'display': 'none' }}
                htmlFor="eventId"
              >
                Identificador do evento
              </label>
              <input
                style={{ 'display': 'none' }}
                id="eventId"
                value={formData.eventId}
                onChange={(event) => setFormData({ ...formData, eventId: event.target.value })}
                placeholder=""
              />
              <label htmlFor="guestName">Nome do convidado</label>
              <input
                id="guestName"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder="Ex.: Maria"
              />
              <label htmlFor="guestPhone">Telefone</label>
              <InputMask
                id="guestPhone"
                mask="(99) 99999-9999"
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                placeholder="(11) 99999-9999"
              />
              <div className="guestsQuantity">
                <label htmlFor="guestAdult">Quantidade de adultos</label>
                <select
                  id="guestAdult"
                  value={formData.adult}
                  onChange={(event) => setFormData({ ...formData, adult: Number(event.target.value) })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
              <div className="guestsQuantity">
                <label htmlFor="guestChildren">Quantidade de crianças</label>
                <select
                  id="guestChildren"
                  value={formData.children}
                  onChange={(event) => setFormData({ ...formData, children: Number(event.target.value) })}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
              {error && <p className="adminInvitationError">{error}</p>}
              <button type="submit" className="button_modal primary">Gerar link</button>
            </form>

            {isLinkModalOpen && generatedLink && (
              <div className="adminInvitationModalOverlay" onClick={() => setIsLinkModalOpen(false)}>
                <div className="adminInvitationModal" role="dialog" aria-modal="true" aria-labelledby="generated-link-title" onClick={(event) => event.stopPropagation()}>
                  <div className="adminInvitationModalHeader">
                    <h3 id="generated-link-title">Link gerado</h3>
                    <button type="button" className="adminInvitationModalClose" onClick={() => setIsLinkModalOpen(false)} aria-label="Fechar modal">×</button>
                  </div>
                  <p>Copie o link abaixo ou envie diretamente para o WhatsApp.</p>
                  <label htmlFor="generatedLink">Link gerado</label>
                  <input id="generatedLink" value={generatedLink} readOnly />
                  <div className="adminInvitationActions">
                    <button type="button" className="button_modal secondary" onClick={handleCopyLink}>
                      <FaCopy /> Copiar link
                    </button>
                    <button type="button" className="button_modal primary" onClick={handleSendWhatsApp}>
                      <FaWhatsapp /> Enviar pro WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AdminInvitation
