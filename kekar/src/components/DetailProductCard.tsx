'use client';

import { Products } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import WishlistButton from './WishlistButton';

export default function DetailProductCard({ product }: Readonly<{ product: Products }>) {
    console.log("🚀 ~ DetailProductCard ~ product:", product)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const allImages = [product.thumbnail, ...product.images];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="relative aspect-square w-full">
                    <div className="relative h-full w-full">

                        <Image
                            src={allImages[currentImageIndex]}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                            priority
                        />
                        <div className="absolute inset-0 flex items-center justify-between p-4">
                            <button
                                onClick={prevImage}
                                className="bg-black/50 hover:bg-black/70 text-slate-900 p-2 rounded-full"
                                aria-label="Previous image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextImage}
                                className="bg-black/50 hover:bg-black/70 text-slate-900 p-2 rounded-full"
                                aria-label="Next image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4 overflow-x-auto">
                        {allImages.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative w-20 h-20 flex-shrink-0 ${currentImageIndex === index ? 'ring-2 ring-red-500' : ''
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    fill
                                    className="object-cover rounded"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="text-slate-900 space-y-6">
                    <h1 className="text-3xl font-bold text-red-500">{product.name}</h1>
                    <p className="text-xl text-slate-900">{product.excerpt}</p>
                    <div className="flex gap-2">
                        {product.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className="text-2xl font-bold">
                        Rp {product.price.toLocaleString('id-ID')}
                    </p>
                    <div className="prose prose-invert">
                        <p>{product.description}</p>
                    </div>
                    <div className='flex'>
                        <button className="w-full py-3 px-6 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg font-bold hover:from-red-600 hover:to-red-800 transition-all">
                            Add to Cart
                        </button>
                        <div className='relative ml-12'>
                            <WishlistButton productId={product._id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

