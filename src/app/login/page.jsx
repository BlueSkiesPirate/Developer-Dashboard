"use client"

import { login } from "@/lib/actions/auth"

export default function Login() {
    return (

        <button onClick={() => login("google")} className="flex items-center gap-4 shadow-xl rounded-lg pl-3">
            <span className="bg-blue-500 text-white px-4 py-3">sign in with google</span>
        </button>
    )
}