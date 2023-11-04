import { Link, Outlet, useNavigate } from "react-router-dom"
import Images from "../../assets/Images"
import { useState } from "react"
import { ItemInCart } from "../cart/ItemInCart"
import style from "./home.module.css"


export function Home() {
    const [cart, setCart] = useState({})
    const [cartPopup, setCartPopup] = useState(false)
    const navigate = useNavigate()

    const cartTotalQuant = Object.values(cart).reduce((total, itemArr) => total + itemArr[1], 0)
    const totalPrice = Object.values(cart).reduce((price, itemArr) => price + itemArr[0].price*itemArr[1], 0)
    function addToCart(item, quantity) {
        const newCart = {...cart}
        if(quantity > 0) {
            newCart[item.id] = [item, quantity]
        } else {
            delete newCart[item.id]
        }
        setCart(newCart)
    }
    function openCart() {
        setCartPopup(false)
        navigate("/cart")
    }
    
    return(
        <div className={style.home} > 
            <h1>Shopping Cart</h1>
            <div className={style.head}>
                <nav>
                    <Link className={style.link} to="/">Home</Link>
                    <Link className={style.link} to="/products">Products</Link>
                </nav>
                <div className={style.cart} >
                    <button type="button" onClick={() => setCartPopup(!cartPopup)}>
                        <img src={Images.cart} />
                    </button>
                    <div>{cartTotalQuant}</div>
                </div>
                {cartPopup && 
                    <div className={style.cartPopup} >
                        <div className={style.title} >
                            <h4>Cart</h4>
                            <button type="button" onClick={() => setCartPopup(false)}>x</button>
                        </div>
                        <hr />
                        <form>
                            {Object.values(cart).map((itemArr, idx) => 
                                <ItemInCart style="popup" key={idx} item={itemArr[0]} quantity={itemArr[1]} editing={true} addToCart={addToCart} />)
                            }
                            {totalPrice > 0 && <p>Total: ${totalPrice}</p>}
                            {totalPrice == 0 && <p>You do not have any item.</p>}
                            <button type="button" onClick={openCart}>checkout</button>
                        </form>

                    </div>
                }
            </div>
            <hr />
            <Outlet context={{addToCart, cart}} />
            
        </div>
    )
}