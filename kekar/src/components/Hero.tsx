'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const products = [
{
    id: 1,
    name: "Project Blackout Pre-Workout",
    price: 499000,
    image: "https://image.pollinations.ai/prompt/preworkout%20supplement%20black%20container",
    category: "Pre-Workout"
},
{
    id: 2,
    name: "Loaded Mass Gainer",
    price: 799000,
    image: "https://image.pollinations.ai/prompt/mass%20gainer%20supplement%20black%20container",
    category: "Gainers"
},
{
    id: 3,
    name: "ISO Whey Protein",
    price: 899000,
    image: "https://image.pollinations.ai/prompt/whey%20protein%20supplement%20black%20container",
    category: "Protein"
},
{
    id: 4,
    name: "BCAA Energy",
    price: 399000,
    image: "https://image.pollinations.ai/prompt/bcaa%20supplement%20black%20container",
    category: "Amino Acids"
}
]

export default function Hero() {
  return (
    <>
    {/* Hero Section */}
    <section className="relative h-screen">
        <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        poster="https://image.pollinations.ai/prompt/gym%20workout%20intensity"
        >
        <source src="/gym-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-extrabold leading-tight mb-6"
        >
            UNLEASH YOUR <span className="text-white">POTENTIAL</span>
        </motion.h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Premium supplements engineered for elite performance and maximum results
        </p>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-md text-lg font-bold transition duration-300 w-fit border border-white/20">
            SHOP NOW
        </button>
        </div>
    </section>

    {/* Featured Products */}
    <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">BEST SELLERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
            <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900 rounded-lg overflow-hidden group"
            >
            <div className="relative h-80 overflow-hidden">
                <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
                />
            </div>
            <div className="p-6">
                <div className="text-sm text-gray-400 mb-2">{product.category}</div>
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                <span className="text-lg">Rp {product.price.toLocaleString()}</span>
                <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-sm font-bold transition duration-300 border border-white/20">
                    Add to Cart
                </button>
                </div>
            </div>
            </motion.div>
        ))}
        </div>
    </section>

    {/* Call to Action */}
    <section className="relative py-32 bg-gradient-to-b from-zinc-900 to-black border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-8">READY TO TRANSFORM?</h2>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of athletes who trust our supplements for their fitness journey
        </p>
        <button className="bg-black hover:bg-zinc-900 text-white px-8 py-4 rounded-md text-lg font-bold transition duration-300">
            EXPLORE PRODUCTS
        </button>
        </div>
    </section>
    </>
  )
}
