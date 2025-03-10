import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { api } from '../../services/api';
import { FaPhoneAlt } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import './styles.css'

const GuestList = () => {
  const [guests, setGuests] = useState(null)
  const [adultsOn, setAdultsOn] = useState(0)
  const [childrenOn, setChildrenOn] = useState(0)

  function getAllGuests() {
    api.get('/guests').then((response) => {
      if(!response.data.guests) return
      const filterGuests = response.data.guests.filter(guest => guest.on)
      setGuests(filterGuests)
    });
  }

  useEffect(() => {
    getAllGuests()
  }, [])
  
  useEffect(() => {
    if(!guests) return

    const sumAdults = guests.reduce((acumulador, guest) => {
      return acumulador + guest.adult;
    }, 0);

    const sumChildren = guests.reduce((acumulador, guest) => {
      return acumulador + guest.children;
    }, 0);

    if(sumAdults) setAdultsOn(sumAdults)
    if(sumChildren) setChildrenOn(sumChildren)

  }, [guests])

  return (
    <Layout isConfirmationPage={true}>
      <div className='guestsContainer'>
        <p className='allConfirmed'>
         Total de adultos confirmados: <strong>{adultsOn}</strong>
        </p >
        <p className='allConfirmed'>
          Total de crianças confirmadas: <strong>{childrenOn}</strong>
        </p>
          <div>
            {
              guests && guests?.map((guest,index) => (
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