import WishlistModel from "@/db/models/WishlistModel";
import { customError } from "@/helpers/customError";
import { CustomError } from "@/types";

export async function GET(request: Request) {
    try {
        const userId = request.headers.get("x-user-id") as string;
        // console.log("OK")
        const data = await WishlistModel.getAll(userId)
        // console.log("🚀 ~ GET ~ data:", data)
        return Response.json(data)
    } catch (err) {
       console.log("🚀 ~ POST ~ err:", err)
       return customError(err as CustomError)
    }

}

