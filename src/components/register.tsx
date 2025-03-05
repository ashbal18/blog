"use client";

import { Iregister } from "@/app/type";
import { useState } from "react";
import RegisterForm from "./registerForm";

export default function Register() {
  const [register, setRegister] = useState<Iregister[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const onReload = () => setReload(!reload);

  return <RegisterForm onReload={onReload} />;
}
