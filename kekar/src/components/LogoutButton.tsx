"use client"
import { handleLogout } from '@/actions'
import React from 'react'

export default function LogoutButton() {
    return (
        <button
            onClick={() => handleLogout()}
            className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
            Logout
        </button>
    )
}
