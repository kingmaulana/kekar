import UserModel from "@/db/models/UserModel";
import { customError } from "@/helpers/customError";
import { CustomError, LoginUser } from "@/types";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        // console.log("🚀 ~ POST ~ body:", body)
        const userLogin: LoginUser = {
            email: body.email,
            password: body.password
        }

        const user = await UserModel.login(userLogin)
        // console.log("🚀 ~ POST ~ user:", user)
        if(!user) throw { message: "invalid email/password", status: 401}

        return Response.json({message: "ok", access_token: user})
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error)
        return customError(error as CustomError)
    }
}