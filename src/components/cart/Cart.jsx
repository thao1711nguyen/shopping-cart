import { useOutletContext } from "react-router-dom";
import { ItemInCart } from "./ItemInCart";
import { useState } from "react";
import style from "./stylesheet/cart.module.css"
export function Cart() {
    const [editing, setEdit] = useState(false)
    const cart = useOutletContext().cart
    const totalPrice = Object.values(cart).reduce((total, itemArr) => total + itemArr[0].price*itemArr[1], 0)
    return(
        
        <div className={style.cart} >
            {Object.keys(cart).length > 0 && 
                <>
                    <div className={style.title} >
                        <h3>Order</h3>
                        {editing && <button onClick={() => setEdit(false)}>Save</button>}
                        {!editing && <button onClick={() => setEdit(true)}>Edit</button>}
                    </div>
                    <hr />
                    <div >
                        {Object.values(cart).map((itemArr, idx) => 
                            <ItemInCart style="cart" key={idx} item={itemArr[0]} quantity={itemArr[1]} editing={editing} />)
                        }
                    </div>
                    {totalPrice > 0  && <div className={style.total}><p>Total: ${totalPrice}</p></div>}
                </>
            }
            {Object.keys(cart).length == 0 && <h3 className={style.h3}>You do not have any item in your cart.</h3>}
            
        </div>
    )
}