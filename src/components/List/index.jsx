import React from "react"
import Badge from '../Badge'
import './styles.css'

export default function List(props) {
    if (!props.items) return

    const itemsSorted = props.items.sort((a, b) => {
        if (a.active === b.active) return 0
        return a.active ? 1 : -1
    })

    return (
        <ul className="list_container">
            {
                itemsSorted.map((item, index) => (
                    <li key={index} className={`list_element item-${item.active ? 'enabled' : 'disabled'}`} onClick={() => props.dispatch(item)}>
                        <div>
                            <button className="list_button"></button>
                            <span translate="no" className="notranslate list_item">{item.name}</span>
                        </div>
                        
                        {
                            item.name.toLowerCase().includes('pix') && !item.active &&
                            <Badge successText='copiado!' text='copiar chave' value='61991209524' />
                        }
                    </li>
                ))}
        </ul>
    )
}
