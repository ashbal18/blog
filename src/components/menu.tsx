"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Avatar from "./avatar";

export default function Menu() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      {user.objectId ? (
        <Avatar user={user} />
      ) : (
        <div className="flex gap-2 h-[30px]">
          <button
            onClick={() => router.push("/register")}
            className="inline-flex items-center border px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-lg hover:bg-gray-100"
          >
            Register
          </button>
          <button
            onClick={() => router.push("/login")}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
