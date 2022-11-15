import React from 'react'
import './styles.css'


export default function Image(props) {
    return (
        <div className='container_image' onClick={() => props.dispatch && props.dispatch()}>
            <img src={props.urlImage} className={`image_${props.size}`} alt={props.alt}></img>
            <span>{props.name}</span>
        </div>
    )
}
