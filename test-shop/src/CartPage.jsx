import React, { useEffect } from 'react'
import { db } from './firebase'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

const CartPage = () => {
    const [cart, setCart] = React.useState([])

    const fetchCart = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'cart'));
            const cartItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCart(cartItems);
        } catch (error) {
            console.error('Error getting documents: ', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);
    
    const handleDelete = async (id) => {
        try {
            // Make sure id is a string
            const docId = String(id);
            // Get a reference to the document first
            const docRef = doc(db, 'cart', docId);
            // Then delete it
            await deleteDoc(docRef);
            console.log('Document successfully deleted!');
            // Update the cart locally
            setCart(prevCart => prevCart.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error in handleDelete:", error);
        }
    }

    const handleQuantityChange = async (item, newQuantity) => {
        try {
            // Make sure quantity is at least 1
            const quantity = Math.max(1, parseInt(newQuantity));
            // Make sure id is a string
            const docId = String(item.id);
            // Get a reference to the document
            const docRef = doc(db, 'cart', docId);
            // Update the document
            await updateDoc(docRef, {
                quantity: quantity,
            });
            console.log('Document successfully updated!');
            // Update the local state
            setCart(prevCart => 
                prevCart.map(cartItem => 
                    cartItem.id === item.id ? {...cartItem, quantity: quantity} : cartItem
                )
            );
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    }

    // Calculate total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0).toFixed(2);
    };

    return (
        <div>
            <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                <header className="text-center">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                </header>

                <div className="mt-8">
                    {cart.length === 0 ? (
                        <p className="text-center">Your cart is empty</p>
                    ) : (
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li key={item.id} className="flex items-center gap-4">
                                <img
                                src={item.image}
                                alt="Product image"
                                className="size-16 rounded-sm object-cover"
                                />
            
                                <div>
                                <h3 className="text-sm text-gray-900">{item.title}</h3>
            
                                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                    <div>
                                    <dt className="inline">Category:</dt>
                                    <dd className="inline">{item.category}</dd>
                                    </div>
                                </dl>
                                </div>
            
                                <div className="flex flex-1 items-center justify-end gap-2">
                                    <label htmlFor={`Line${item.id}Qty`} className="sr-only"> Quantity </label>
            
                                    <input
                                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                                    type="number"
                                    min="1"
                                    value={item.quantity || 1}
                                    id={`Line${item.id}Qty`}
                                    className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                    />
            
                                <button 
                                    className="text-gray-600 transition hover:text-red-600" 
                                    onClick={() => handleDelete(item.id)}
                                    type="button"
                                >
                                    <span className="sr-only">Remove item</span>
            
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                    </svg>
                                </button>
                                </div>
                            </li>
                            ))}
                    
                        </ul>
                    )}

                    {cart.length > 0 && (
                        <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                        <div className="w-screen max-w-lg space-y-4">
                            <dl className="space-y-0.5 text-sm text-gray-700">
                            <div className="flex justify-between !text-base font-medium">
                                <dt>Total</dt>
                                <dd>£{calculateTotal()}</dd>
                            </div>
                            </dl>

                            <div className="flex justify-end">
                            <a
                                href="#"
                                className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                            >
                                Checkout
                            </a>
                            </div>
                        </div>
                        </div>
                    )}
                </div>
                </div>
            </div>
            </section>
        </div>
    )
}

export default CartPage