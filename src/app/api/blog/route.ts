import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, category, thumbnail, content, userId } = await req.json();
    const userToken = req.cookies.get("user-token")?.value;

    if (!userToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { data } = await axios.post(
      "/data/Blogs",
      {
        title,
        category,
        thumbnail,
        content,
      },
      {
        headers: {
          "user-token": userToken,
        },
      }
    );
    await axios.post(`/data/Blogs/${data.objectId}/author`, [userId], {
      headers: {
        "user-token": userToken,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        { error: err.response?.data || "Create Blog Failed" },
        { status: err.response?.status || 400 }
      );
    }
    return NextResponse.json({ error: "Terjadi Kesalahan" }, { status: 500 });
  }
}
