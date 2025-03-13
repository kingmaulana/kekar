"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export const AISuggestion = async () => {
    console.log("Mantul bro")
    // hit APi dedngan API secret, tanpa takut ter ekspose
}

export const handleLogout = async () => {
    const cookieStore = await cookies()
    cookieStore.delete("authorization")
    redirect("/")
}