import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Products } from "./components/products/Products";
import { Cart } from "./components/cart/Cart";
import { About } from "./components/about/About";
import { Error } from "./components/error/Error";
export function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />, 
            children: [
                {
                    index: true, 
                    element: <About />
                }, 
                {
                    path: 'products', 
                    element: <Products />,
                },
                {
                    path: 'cart', 
                    element: <Cart />,
                }
            ], 
            errorElement: <Error />
        }, 
        
    ])
    return(
        <RouterProvider router={router}/>
    )
}