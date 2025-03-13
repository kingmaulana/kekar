'use client'
import { Products } from '@/types'
import Link from 'next/link'
import React from 'react'
import WishlistButton from './WishlistButton'

export default function ProductCard({ product }: Readonly<{ product: Products }>) {
    // console.log("🚀 ~ ProductCard ~ product:", product)
    return (
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <figure className="relative group">
                <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute top-2 right-2">
                    <WishlistButton productId={product._id} />
                </div>
            </figure>
            <div className="p-5 space-y-3">
                <h2 className="text-xl font-bold text-gray-900 line-clamp-1 hover:text-gray-700">{product.name}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

                <div className="pt-2">
                    <h2 className="text-lg font-bold text-gray-900">Rp {product.price.toLocaleString('id-ID')}</h2>
                </div>

                <Link
                    href={`/products/${product.slug}`}
                    className="block w-full text-center py-2 mt-4 bg-red-800 text-white font-semibold rounded hover:bg-gray-800 transition-colors duration-300">
                    Details
                </Link>
            </div>
        </div>
    )
}
