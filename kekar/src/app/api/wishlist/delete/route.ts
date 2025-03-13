import WishlistModel from "@/db/models/WishlistModel";
import { customError } from "@/helpers/customError";
import { CustomError } from "@/types";
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
    try {
        const { wishlistId } = await request.json()

        if (!wishlistId) {
            return NextResponse.json(
                { message: "Wishlist ID is required" },
                { status: 400 }
            )
        }

        await WishlistModel.removeFromWishlist(wishlistId)

        return NextResponse.json(
            { message: "Item successfully removed from wishlist" },
            { status: 200 }
        )
    } catch (err) {
       console.log("🚀 ~ POST ~ err:", err)
        return customError(err as CustomError)
    }
}