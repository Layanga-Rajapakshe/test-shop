import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
            <div className="md:col-span-1">
                <div className="max-w-lg md:max-w-none">
                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                    Welcome To Web-Shop
                </h2>

                <p className="mt-4 text-gray-700">
                    Here You will find your favorite products at the best prices.
                </p>
                <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={() => navigate('/explore')}>
                Shop Now
                </button>
                </div>
            </div>

            <div className="md:col-span-3">
                <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="rounded"
                alt=""
                />
            </div>
            </div>
        </div>
        </section>
    </div>
  )
}

export default HomePage
