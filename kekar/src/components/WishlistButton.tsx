'use client'

import { Toast } from '@/helpers/SwalAlert'
import { CustomError } from '@/types'
import React from 'react'
import Swal from 'sweetalert2'

export default function WishlistButton({ productId }: { productId: string }) {

    const handleSubmit = async (productId: string) => {
        console.log("🚀 ~ handleSubmit ~ productId:", productId)
        try {
            Swal.showLoading()
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", //kita kasih tau bahwa yg kita kirim itu json
                },
                body: JSON.stringify({ productId: productId }) //string tapi kasih tau diatas ini json
            })

            if (!res.ok) throw await res.json()
            // console.log("berhasil post")

            Toast.fire({
                icon: "success",
                title: "Add wishlist succesfully"
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
    }

    return (
        <button
            onClick={() => handleSubmit(productId)}
            className='btn btn-sm px-2 rounded-full absolute top-2 right-2'
        >
            ⭐️
        </button>
    )
}

