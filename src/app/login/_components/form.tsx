"use client";

import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { login } from "@/redux/userSlice";

const LoginSchema = yup.object().shape({
  login: yup.string().required("field is required"),
  password: yup
    .string()
    .min(6, "min 6 character")
    .required("password is required"),
});

interface ILoginForm {
  login: string;
  password: string;
}

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: ILoginForm = {
    login: "",
    password: "",
  };
  const router = useRouter();
  const dispatch = useDispatch();

  const onLogin = async (
    value: ILoginForm,
    action: FormikHelpers<ILoginForm>
  ) => {
    try {
      const { data } = await axios.post("/api/users/login", value);
      dispatch(login(data));
      router.push("/");
      action.resetForm();
      toast.success("Login Success !");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error?.message || "Login Failed !");
      }
      console.log(err);
    }
  };

  return (
    <div className="mt-16">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={onLogin}
      >
        {(props: FormikProps<ILoginForm>) => {
          const { touched, errors, isSubmitting } = props;
          return (
            <Form className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label htmlFor="login" className="text-md">
                  Email
                </label>
                <Field
                  name="login"
                  className="mt-2 mb-1 p-2 border border-gray-500 rounded-md shadow-md"
                />
                {touched.login && errors.login ? (
                  <div className="text-red-500 text-[12px]">{errors.login}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-md">
                  Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="mt-2 mb-1 p-2 pr-10 border border-gray-500 rounded-md shadow-md w-full"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </button>
                </div>
                {touched.password && errors.password ? (
                  <div className="text-red-500 text-[12px]">
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col md:flex-row mt-12 md:items-center">
                <button
                  className="w-20 text-white py-1 px-2 rounded-md bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading" : "Sign In"}
                </button>
                <p className="text-sm md:ml-6 mt-2 md:mt-0">
                  Create new account ?{" "}
                  <Link href={"/register"} className="text-gray-600 font-bold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
