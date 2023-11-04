import PropTypes from 'prop-types'
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom'
import style from "./stylesheet/item.module.css"

export function Item({data}) {
    const [quantity, setQuantity] = useState(1)
    const context = useOutletContext();
    function changeQuantity(e) {
        setQuantity(+e.target.value)
    }
    return(
        <div className={style.item} >
            <img src={data.image} className={style.image} />
            <p>{data.title}</p>
            <p>${data.price}</p>
            <input type="number" value={quantity} min="1" max="5" onChange={changeQuantity}/>
            <button onClick={() => context.addToCart(data, quantity)}>Add to cart</button>
        </div>
    ) 
}
Item.propTypes = {
    data : PropTypes.object,
}