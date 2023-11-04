import { useEffect, useState } from "react";
import { Item } from "./Item";
import PropTypes from 'prop-types'
import style from "./stylesheet/products.module.css"

export function Products({type="jewelery"}) {
    const [products, setProducts] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                // const response = await fetch(`https://fakestoreapi.com/products/category/${type}?limit=9`)
                const data = await response.json()
                setProducts(data)
            } catch(err) {
                setError(err)
            }
            setLoading(false)
        }
        fetchData()
    }, [type])

    return(
        <div className={style.products} >
            {isLoading && <p>...loading</p>}
            {products && products.map((item, idx) => <Item key={idx} data={item} />)}
            {error && <p>{error.message}</p>}
        </div>
    )
}
Products.propTypes = {
    type: PropTypes.string, 
}
