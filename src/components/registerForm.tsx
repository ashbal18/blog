"use client";

import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

interface IProps {
  onReload: () => void;
}

export default function RegisterForm({ onReload }: IProps) {
  const initialValues: IRegisterForm = {
    name: "",
    email: "",
    password: "",
  };

  const registerUser = async (
    values: IRegisterForm,
    action: FormikHelpers<IRegisterForm>
  ) => {
    try {
      await axios.post(
        "https://jazzygirl-us.backendless.app/api/users/register",
        values
      );
      action.resetForm();
      toast.success("Register Success!");
      onReload();
    } catch (error) {
      if (axios.isAxiosError(error))
      toast.error(error.response?.data?.message || "Register Failed");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-900"
    style={{backgroundImage: "url('bgfood2.jpg')"
    ,width: "100%"
    ,height: "100%"
    ,backgroundSize: "cover"
    }}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden p-6">
        <div className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-200">Sign Up</div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">Create an account to get started</p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={registerUser}
            >
              {(props: FormikProps<IRegisterForm>) => {
                const { errors, touched } = props;
                return (
                  <Form>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="w-full p-2 border rounded"
                      />
                      {touched.name && errors.name && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded"
                      />
                      {touched.email && errors.email && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.email}
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
                      className="w-full bg-blue-950 text-white p-2 rounded hover:bg-red-700"
                    >
                      Register
                    </button>
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-700">
                        Already have an account?{" "}
                        <a
                          href="/login"
                          className="text-blue-500 hover:underline"
                        >
                          Login
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