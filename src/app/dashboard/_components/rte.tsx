"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header:   "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { indent: "-1" }, { indent: "+1" }],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
];

import { FormikHelpers } from "formik";
import { BlogInput } from "@/type";

interface RichTextProps {
  setFieldValue: FormikHelpers<BlogInput>["setFieldValue"];
}

export default function RichTextEditor({ setFieldValue }: RichTextProps) {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: string) => {
    setValue(e);
    setFieldValue("content", e);
  };

  useEffect(() => {
    const handleScroll = () => {
      const toolbar = document.querySelector(".ql-toolbar");
      if (toolbar) {
        if (window.scrollY > toolbar.getBoundingClientRect().top) {
          toolbar.classList.add("sticky");
        } else {
          toolbar.classList.remove("sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
}
