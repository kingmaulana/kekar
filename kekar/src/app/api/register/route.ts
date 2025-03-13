import UserModel from "@/db/models/UserModel"
import { customError } from "@/helpers/customError"
import { CustomError, NewUser } from "@/types"

export async function POST(request: Request) {
    try {
        
        const body = await request.json()
        const newUser: NewUser = {
            email: body.email,
            password: body.password,
            username: body.username
        }
        await UserModel.create(newUser)
        
        return Response.json({ message: `Success register new user : ${body.email}`}, {status: 201})
    } catch (err) {
        console.log("🚀 ~ POST ~ err:", err)
        return customError(err as CustomError)
    }
}