
"use client";
import { motion } from 'framer-motion';
import React from 'react'

export default function AboutSection() {
  return (
    <>
    {/* Hero Section */}
    <section className="px-4 py-24 sm:py-32 md:px-8 bg-black text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto text-center"
                >
                    <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                        Empowering Your Health Journey
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        At Kekar, we&apos;re dedicated to providing premium quality supplements that help you achieve your optimal health and fitness goals.
                    </p>
                </motion.div>
            </section>

            {/* Brand Story Section */}
            <section className="px-4 py-20 bg-white md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                        >
                            {/* Add your brand image here */}
                            <img
                                src="https://image.pollinations.ai/prompt/logo%20strong%20muscular?width=1125&height=1456&seed=2070479424&nologo=true&model=flux"
                                alt="Flowbite Logo"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-semibold">Our Story</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Founded in 2020, Kekar was born from a passion for helping people achieve their health and fitness goals through premium quality supplements. Our journey began with a simple mission: to provide transparent, science-backed supplements that deliver real results.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Today, we continue to innovate and expand our product line while maintaining our commitment to quality, purity, and effectiveness in every supplement we produce.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quality Highlights Section */}
            <section className="px-4 py-20 bg-black text-white md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center">
                        Our Quality Commitment
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Premium Ingredients", description: "We source only the highest quality, pure ingredients for our supplements." },
                            { title: "Third-Party Tested", description: "Every batch is tested by independent laboratories for purity and potency." },
                            { title: "GMP Certified", description: "Our facilities maintain strict Good Manufacturing Practice standards." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-xl bg-gray-900"
                            >
                                <h3 className="text-xl font-semibold mb-4 text-white">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="px-4 py-20 bg-white md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Natural", description: "100% natural ingredients" },
                            { title: "Science-Backed", description: "Research-supported formulas" },
                            { title: "Transparent", description: "Clear ingredient labeling" },
                            { title: "Results", description: "Proven effectiveness" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center p-6"
                            >
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Store Information */}
            <section className="px-4 py-20 bg-gray-100 md:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-semibold mb-6">Visit Our Store</h2>
                        <p className="text-gray-600 mb-8">
                            Experience our products firsthand at our flagship store
                        </p>
                        <div className="space-y-2">
                            <p className="text-gray-800"><strong>Address:</strong> 123 Health Street, Fitness District</p>
                            <p className="text-gray-800"><strong>Hours:</strong> Mon-Sat: 9AM-8PM, Sun: 10AM-6PM</p>
                            <p className="text-gray-800"><strong>Phone:</strong> (555) 123-4567</p>
                        </div>
                        <button className="mt-8 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300">
                            Contact Us
                        </button>
                    </motion.div>
                </div>
            </section></>
  )
}
