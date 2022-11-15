import Image from '../Image'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import './styles.css'
import { useEffect, useState } from 'react'

export default function Mosaic(props) {
    const navigate = useNavigate()
    const [items, setItems] = useState(null)

    function handleClick(id) {
        navigate(`category/${id}`)
    }

    function getApiData() {
        api.get('categories').then(response => {
            setItems(response.data)
            props.handleLoading()
        })
    }

    useEffect(() => {
        getApiData()
    }, [])

    return (
        <section className='container_mosaic'>
            <div className='content_images'>
                {items && 
                    [items[0],items[1]].map((itm,idx) => {
                        return <Image key={idx} alt={itm.name} dispatch={() => handleClick(itm.id)} urlImage={itm.urlImage} size={idx === 0 ? 'md' : 'sm'} name={itm.name} />
                })}
            </div>
            <div className='content_images'>
                {items &&
                    [items[2],items[3]].map((itm,idx) => {
                        return <Image key={idx} alt={itm.name} dispatch={() => handleClick(itm.id)} urlImage={itm.urlImage} size={idx === 0 ? 'sm' : 'md'} name={itm.name} />
                })}
            </div>
        </section>
    )
}
