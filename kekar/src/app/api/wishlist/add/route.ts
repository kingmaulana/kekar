import WishlistModel from "@/db/models/WishlistModel";
import { customError } from "@/helpers/customError";
import { CustomError } from "@/types";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const userId = request.headers.get("x-user-id") as string;
        const body = await request.json();
        const { productId } = body;

        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 401 }
            );
        }

        if (!productId) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        await WishlistModel.add(productId, userId);
        
        return NextResponse.json(
            { message: "Success add to wishlist" },
            { status: 200 }
        );
    } catch (err) {
        console.log("🚀 ~ POST ~ err:", err)
        return customError(err as CustomError)
    }
}