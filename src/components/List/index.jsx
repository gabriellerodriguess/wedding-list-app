import React from "react"
import Badge from '../Badge'
import './styles.css'

export default function List(props) {    
    return (
        <ul  className="list_container">
            { props.items &&
                props.items.map((item,index) => (
                    <li key={index} className={`list_element item-${item.active ? 'enabled' : 'disabled'}`} onClick={() => props.dispatch(item)}>
                        <div>
                            <button className="list_button"></button> 
                            <span translate="no" className="notranslate list_item">{item.name}</span>
                        </div>
                        {
                            item.name.toLowerCase().includes('pix') &&
                            <Badge successText='copiado!' text='copiar chave' value='61991209524'/>
                        }
                    </li>
                ))}
        </ul>
    )
}
