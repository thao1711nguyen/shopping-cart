import PropTypes from "prop-types"
import { useOutletContext } from "react-router-dom"
import stylesheet from "./stylesheet/itemInCart.module.css"
export function ItemInCart({style, item, quantity, editing, addToCart}) {
    const total = item.price*quantity
    const context = useOutletContext()
    if(!addToCart) {
        addToCart = context.addToCart
    } 
    if(editing) {
        return(
            <>
                <div className={stylesheet[style]}>
                    <img src={item.image} />
                    <p>{quantity}x${item.price}</p>
                    <input type="number" min="1" max="5" value={quantity} onChange={(e) => addToCart(item, +e.target.value )}/>
                    <button onClick={() => addToCart(item, 0)}>delete</button>
                </div>
                <hr />
            </>
        )
    }
    return(
        <>
            <div className={stylesheet[style]}>
                <img src={item.image} />
                <p>{quantity}x${item.price}</p>
                <p>${total}</p>
            </div>
            <hr />
        </>
    )
}
ItemInCart.propTypes = {
    item: PropTypes.object, 
    quantity: PropTypes.number, 
    editing: PropTypes.bool, 
    addToCart: PropTypes.func,
    style: PropTypes.string
}