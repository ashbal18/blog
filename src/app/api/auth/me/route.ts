import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userToken = req.cookies.get("user-token")?.value;
    console.log(!userToken);
    if (!userToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { data } = await axios.get("/services/Auth/current", {
      headers: {
        "user-token": userToken,
      },
    });
    console.log(data);
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);

    if (err instanceof AxiosError) {
      return NextResponse.json(
        { error: err.response?.data.message || "Unauthorized" },
        { status: err.response?.status || 401 }
      );
    }
    return NextResponse.json({
      error: "Unauthorized",
    });
  }
}
