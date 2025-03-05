import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userToken = req.cookies.get("user-token")?.value;
    await axios.get("/users/logout", {
      headers: {
        "user-token": userToken,
      },
    });

    const response = NextResponse.json({ message: "Logout success !" });
    response.cookies.set("user-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        { error: err.response?.data || "Login Failed !" },
        { status: err.response?.status || 401 }
      );
    }
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
