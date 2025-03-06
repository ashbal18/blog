"use client";

import { useState } from "react";
import RegisterForm from "./registerForm";

export default function Register() {
  const [reload, setReload] = useState<boolean>(false);
  const onReload = () => setReload(!reload);

  return <RegisterForm onReload={onReload} />;
}
