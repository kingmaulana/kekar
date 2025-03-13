import ProductModel from "@/db/models/ProductModel"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 3

    const products = await ProductModel.getAll( page, limit )
    
    // Implement pagination manually
    // const paginatedProducts = products.slice(offset, offset + limit)
    // return Response.json(paginatedProducts)

    return Response.json(products)
}
