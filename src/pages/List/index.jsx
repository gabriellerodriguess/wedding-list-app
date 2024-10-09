import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import Layout from '../../components/Layout'
import './styles.css'

export default function List() {
  const [gifts, setGifts] = useState([])
  const [categories, setCategories] = useState([])

  function getCategories() {
    api.get(`categories`).then(response => {
      setCategories(response.data)
    })
  }

  function getItems() {
    categories.map(category => {
      api.get(`items?category=${category.id}`).then(response => {
        if(!response.data) return
  
        const filterGuests = response.data.filter(gift => gift.guest !== null)
  
        console.log(filterGuests,'filter guest')
        setGifts(filterGuests)
      })
    })
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if(!categories) return
    console.log(categories,`categories`)
    getItems()
  }, [categories])


  if(!gifts.length) return null

  return (
    <Layout>
      <div className='card-gift-container'>
        <div className='card-gift-content'>
          {
            gifts.map((item, index) => {
              return (
                <div key={index} className='card-gift'>  
                  <p>
                  {item.name}
                  </p> 
                  <span>
                    {item.guest}
                  </span>
                </div>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
} 