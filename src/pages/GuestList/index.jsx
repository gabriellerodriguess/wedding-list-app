import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { api } from '../../services/api';
import { FaPhoneAlt } from "react-icons/fa";
import { FaChildren, FaPerson } from "react-icons/fa6";
import { urlParamsFormatted, urlParams} from '../../utils/searchParams'

import './styles.css'

const GuestList = () => {
  const [guests, setGuests] = useState(null)
  const [adultsOn, setAdultsOn] = useState(0)
  const [childrenOn, setChildrenOn] = useState(0)

  function getAllGuests() {
    api.get(`/guests${urlParams}`)
      .then((response) => {
        const guests = response.data

        if (!Array.isArray(guests)) return

        const filterGuests = guests.filter(guest => guest.on)
        setGuests(filterGuests)
      })
      .catch(console.error)
  }

  useEffect(() => {
    getAllGuests()
  }, [])


  useEffect(() => {
    if (!guests) return

    const sumAdults = guests.reduce((acumulador, guest) => {
      return acumulador + guest.adult;
    }, 0);

    const sumChildren = guests.reduce((acumulador, guest) => {
      return acumulador + guest.children;
    }, 0);

    if (sumAdults) setAdultsOn(sumAdults)
    if (sumChildren) setChildrenOn(sumChildren)

  }, [guests])

  return (
    <Layout event={urlParamsFormatted} ConfirmationPage={true} maintenance={false}>
      <div className='guestsContainer'>
        <p className='allConfirmed'>
          Total de adultos confirmados: <strong>{adultsOn}</strong>
        </p >
        <p className='allConfirmed'>
          Total de crianças confirmadas: <strong>{childrenOn}</strong>
        </p>
        <div>
          {
            guests && guests?.map((guest, index) => (
              <div className='guestContent' key={index}>
                <p>{guest.name}</p>
                <span>
                  <FaPhoneAlt />
                  {guest.phone}
                </span>
                <span>
                  <FaPerson />
                  Adultos: {guest.adult}
                </span>
                <span>
                  <FaChildren />
                  Crianças: {guest.children}
                </span>
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  )

}


export default GuestList