
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BannerSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pb-20">
                <div className="absolute inset-0 bg-red-500/5"></div>
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                        <div className="relative order-2 md:order-1">
                            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
                                <Image
                                    src="/me-1.png"
                                    alt="Premium Supplements"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-2xl"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-8 h-60 w-48 rounded-xl overflow-hidden border-4 border-black">
                                <Image
                                    src="/me-2.png"
                                    alt="Quality Products"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-xl"
                                />
                            </div>
                        </div>
                        <div className="order-1 md:order-2 text-left">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                                Transform Your Life With Premium Supplements
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 mb-8">
                                Science-backed formulations designed to enhance your performance,
                                health, and vitality.
                            </p>
                            <Link
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-300"
                                href={'/products'}
                            >
                                Shop Our Collection
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
  )
}
