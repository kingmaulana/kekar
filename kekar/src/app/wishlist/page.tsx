'use client';

import { CustomError, Products } from '@/types';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
// Sample wishlist data
// const initialWishlistItems = [
//     {
//         id: 1,
//         title: 'Wireless Headphones',
//         price: 199.99,
//         image: 'https://picsum.photos/seed/headphones/300/300',
//     },
//     {
//         id: 2,
//         title: 'Smartwatch',
//         price: 299.99,
//         image: 'https://picsum.photos/seed/watch/300/300',
//     },
//     {
//         id: 3,
//         title: 'Laptop Bag',
//         price: 79.99,
//         image: 'https://picsum.photos/seed/bag/300/300',
//     },
//     {
//         id: 4,
//         title: 'Mechanical Keyboard',
//         price: 149.99,
//         image: 'https://picsum.photos/seed/keyboard/300/300',
//     },
// ];

export type WishListItem = {
    _id: string;
    product: Products;
}

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState<WishListItem[]>([]);
    // console.log("🚀 ~ Wishlist ~ wishlistItems:", wishlistItems)

    const removeFromWishlist = async (wishlistId: string) => {
        try {
            Swal.showLoading()
            const res = await fetch('/api/wishlist/delete', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ wishlistId }) // Send the wishlist document _id
            })
    
            if (!res.ok) throw await res.json()
    
            // Update local state after successful deletion
            setWishlistItems(prev => prev.filter(item => item._id !== wishlistId))
    
            Swal.fire({
                icon: "success",
                title: "Item removed from wishlist successfully"
            });
    
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: (err as CustomError).message,
                text: "Something went wrong!",
            });
        } finally {
            Swal.hideLoading()
        }
    };
    

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("/api/wishlist");
                //  console.log("🚀 ~ fetchProducts ~ response:", response)
                if (!response.ok) {
                    throw new Error("Failed to fetch wishlist");
                }
                const data: WishListItem[] = await response.json();
                 console.log("🚀 ~ fetchProducts ~ data:", data)
                setWishlistItems(data)
                //  console.log("🚀 ~ fetchProducts ~ response:", response)
            } catch (error) {
                console.error("Error fetching products:", error);
                setWishlistItems([])
            }
        }
        fetchProducts()
    }, []);

    return (
        <div className="min-h-screen w-[100%] py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="min-w-full">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Wishlist</h1>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-500 text-xl mb-4">Your wishlist is empty</div>
                        <p className="text-gray-400">Items you add to your wishlist will appear here</p>
                    </div>
                ) : (
                    <div className="min-w-full">
                        {wishlistItems.map((item) => (
                            <div
                                key={item.product.slug}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex m-5 w-10/12"
                            >
                                <div className="relative">
                                    <img
                                        src={item.product.thumbnail}
                                        alt={item.product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <button
                                        onClick={() => removeFromWishlist(item._id)}
                                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-200"
                                    >
                                        <FaTrash className="text-red-500 w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-4 flex flex-col justify-start items-start">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{item.product.name}</h3>
                                    <p className="text-gray-900 font-bold">Rp {item.product.price.toLocaleString('id-ID')}</p>

                                    <div className='flex justify-center items-center py-2'>
                                        <button className='bg-black text-white px-5 font-bold rounded'>Paid</button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
