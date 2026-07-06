export const getInvitationSettings = (search = window.location.search) => {
  const params = new URLSearchParams(search)
  const eventId = params.get('event_id') || ''
  const adult = Number(params.get('adult') || 1)
  const children = Number(params.get('children') || 0)
  const name = params.get('name') || ''
  const phone = params.get('phone') || ''
  const hasControlledValues = params.has('adult') || params.has('children')

  return {
    eventId,
    adult: Number.isNaN(adult) ? 1 : adult,
    children: Number.isNaN(children) ? 0 : children,
    name,
    phone,
    isControlled: hasControlledValues,
  }
}

export const buildInvitationLink = ({ eventId = '', adult = 1, children = 0, name = '', phone = '', origin = window.location.origin, basePath = process.env.PUBLIC_URL || '' }) => {
  const params = new URLSearchParams({
    event_id: eventId,
    adult: String(adult),
    children: String(children),
    name: String(name),
    phone: String(phone)
  })

  return `${origin}${basePath}/confirmation?${params.toString()}`
}

export const getWhatsAppMessage = ({ name = '', link = '' }) => {
  const greeting = name && name.trim() ? name.trim() : ''
  return `${greeting ? `Olá ${greeting}!` : ''}\n\n🎉 É com imensa alegria que convido você para celebrar os 48 anos da Kennya! ❤️\n\nMas atenção... 🤫 é uma festa surpresa! Então, por favor, não conte nada para ela e nos ajude a manter esse segredo.\n\nSua presença é muito importante para tornar esse momento ainda mais especial!\n\nConfirme sua presença pelo link abaixo:\n\n${link}`
}

export const normalizePhone = (phone = '') => {
  const digits = phone.replace(/\D/g, '')

  if (!digits) return ''
  if (digits.startsWith('55')) return digits
  if (digits.length === 10 || digits.length === 11) return `55${digits}`

  return digits
}
