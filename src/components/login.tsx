"use client";

import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { login } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import React from "react";

const LoginSchema = yup.object().shape({
  login: yup.string().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface ILoginForm {
  login: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues: ILoginForm = {
    login: "",
    password: "",
  };

  const onLogin = async (
    value: ILoginForm,
    action: FormikHelpers<ILoginForm>
  ) => {
    try {
      const { data } = await axios.post("/api/auth/login", value);
      dispatch(login(data));
      console.log(data);
      router.push("/");
      action.resetForm();
      console.log("Login successful:");
      toast.success("login sukses !");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.error?.message || "Login Failed");
        console.log(err);
      }
    }
  };

  return (
    <div className="relative h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="relative z-10 w-[90%] md:w-full md:max-w-[400px] rounded-xl bg-white shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Sign In
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Please enter your details.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={onLogin}
        >
          {(props: FormikProps<ILoginForm>) => {
            const { errors, touched } = props;
            return (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="login"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded"
                  />
                  {touched.login && errors.login && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.login}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-2 border rounded"
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
                >
                  Login
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-700">
                    Tidak Mempunyai akun?{" "}
                    <a
                      href="/register"
                      className="text-blue-500 hover:underline"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
