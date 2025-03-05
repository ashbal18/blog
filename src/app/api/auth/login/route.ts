import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { login, password } = await req.json();
        const { data } = await axios.post("/users/login", { login, password });

        const response = NextResponse.json(data)
        response.cookies.set("user-token", data["user-token"], {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24, // expired dalam 1 hari
        });
        return response;
    } catch (err) {
        if ( err instanceof AxiosError) {
            return NextResponse.json(
               {error: err.response?.data.message || "Login Failed"},
               {status: err.response?.status || 401} 
            );
        return NextResponse.json({error: "Terjadi Kesalahan"}, {status: 500});
    }
}
}