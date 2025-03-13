import { LoginUser, NewUser } from "@/types";
import database from "../config/mongodb";
import { z } from "zod";
import { comparePassword, hashPassword } from "@/helpers/bcyrpt";
import { signToken } from "@/helpers/jwt";
import { cookies } from "next/headers";

const UserSchema = z.object({
    username: z.string().min(3, { message: "username must be min 3 chaaracter" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(5),
  });

const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
})

class UserModel {
    static collection () {
        return database.collection<NewUser>("users")
    }

    static async create(newUser: NewUser) {
        //valdiasi using zod package
        UserSchema.parse(newUser) //check if the neww user is same like schema Zod

        //unique email
        const user = await this.collection().findOne({
            $or: [
                { email: newUser.email },
                { username: newUser.username }
            ]
        })
        if(user) throw { message: "Email or username already exist", status: 409 }
        //hashpassword
        newUser.password = hashPassword(newUser.password)
        newUser.createdAt = new Date()
        newUser.updatedAt = new Date()
        // console.log(newUser)
        await this.collection().insertOne(newUser)
        return "Success create new user"
    }

    static async login(login: LoginUser) {
        // console.log("🚀 ~ UserModel ~ login ~ login:", login)
        LoginSchema.parse(login)
        const user = await this.collection().findOne({ email: login.email })
        if(!user) throw  { message: "Invalid email/password", status: 401 }

        const isPasswordValid = comparePassword(login.password, user.password)
        if(!isPasswordValid) throw { message: "Invalid email/password", status: 401 }

        const token = signToken({
            _id: user._id.toString(),
            email: user.email
        })

        //menyimpan ke cookie di response
        const cookieStore = await cookies()
        cookieStore.set("authorization", `Bearer ${token}`)

        return token
    }
}

export default UserModel;
