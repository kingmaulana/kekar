import ProductModel from "@/db/models/ProductModel"
import { customError } from "@/helpers/customError"
import { CustomError } from "@/types"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {

  try {
      const slug = (await params).slug 
      const product = await ProductModel.getProductByName(slug)
      if(!product) throw { message: "Product Not Found", status: 404}
      return Response.json(product)
  } catch (err) {
      return customError(err as CustomError)
  }
}