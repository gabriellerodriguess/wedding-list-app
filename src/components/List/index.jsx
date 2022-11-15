import React from "react"
import './styles.css'

export default function List(props) {
    return (
        <ul  className="list_container">
            { props.items &&
                props.items.map((item,index) => (
                    <li key={index} className={`list_element item-${item.active ? 'enabled' : 'disabled'}`} onClick={() => props.dispatch(item)}>
                        <button className="list_button"></button> 
                        <span className="list_item">{item.name}</span>
                    </li>
                ))}
        </ul>
    )
}
