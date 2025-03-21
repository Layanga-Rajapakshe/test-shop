import React from 'react'
import { Link } from 'react-router-dom'

const ExplorePage = () => {
    const [products, setProducts] = React.useState([])
    React.useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error(error))
    }, [])
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Explore your favourite items here</h2>
            </header>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map(product => (
                <li>
                <Link to={`/product/${product.id}`} className="group block overflow-hidden">
                <img
                    src={product.image}
                    alt="product image"
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />

                <div className="relative bg-white pt-3">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {product.title}
                    </h3>

                    <p className="mt-2">
                    <span className="sr-only"> Regular Price </span>

                    <span className="tracking-wider text-gray-900"> ${product.price} </span>
                    </p>
                </div>
                </Link>
            </li>
            ))}
            </ul>
        </div>
        </section>
    </div>
  )
}

export default ExplorePage
