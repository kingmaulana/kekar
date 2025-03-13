"use client"
import { Products } from '@/types'
import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ product }: { product: Products[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.map((el) => (
                <div key={el.slug} className="transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <ProductCard product={el} />
                </div>
            ))}
        </div>
    )
}
