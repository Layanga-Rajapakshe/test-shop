import React from 'react'
import { useParams } from 'react-router-dom'
import { addDoc } from "firebase/firestore"
import {db} from "./firebase"
import { collection } from "firebase/firestore"

const ProductPage = () => {
    const {id} = useParams();
    const [product, setProduct] = React.useState({})
    
    React.useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error(error))
    }, [id])

    const AddToCart = async (product) => {
        try {
            await addDoc(collection(db, 'cart'), {
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                quantity: 1,
            });
            console.log('Document successfully written!');
        } catch (error) {
            console.error('Error writing document: ', error);
        }
    }

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent form submission
        AddToCart(product);
    }
    
    return (
        <div>
            <img
                src={product.image}
                alt="product image"
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border border-gray-100 bg-white p-6">
                <h3 className="mt-4 text-lg font-medium text-gray-900">{product.title}</h3>

                <div className="flow-root">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Title</dt>
                        <dd className="text-gray-700 sm:col-span-2">{product.title}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Description</dt>
                        <dd className="text-gray-700 sm:col-span-2">{product.description}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="text-gray-700 sm:col-span-2">${product.price}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">category</dt>
                        <dd className="text-gray-700 sm:col-span-2">{product.category}</dd>
                        </div>
                    </dl>
                </div>

                <form className="mt-4">
                <button
                    className="block w-full rounded-sm bg-blue-500 p-4 text-sm font-medium transition hover:scale-105"
                    onClick={handleAddToCart}
                    type="button"
                >
                    Add to Cart
                </button>
                </form>
            </div>
        </div>
    )
}

export default ProductPage