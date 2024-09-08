import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { CkEditor } from "../commons/CkEditor";
import { createArticle } from "../../services/api";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  datetime: yup.date().required("Date is required"),
  thumbnail: yup
    .mixed()
    .required("Thumbnail image is required")
    .test("fileSize", "File too large", (value) => {
      return value && value.length > 0
        ? value[0].size <= 5 * 1024 * 1024
        : true;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return value && value.length > 0
        ? ["image/jpeg", "image/png"].includes(value[0].type)
        : true;
    }),
});

export const ArticleForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("datetime", data.datetime);
    if (data.thumbnail.length > 0)
      formData.append("thumbnail", data.thumbnail[0]);

    try {
      await createArticle(formData);
      alert("Articles created successfully");
      reset();
    } catch (err) {
      console.error("There was an error!", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Create New Article
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Thumbnail
          </label>
          <Controller
            name="thumbnail"
            control={control}
            defaultValue=""
            render={({ field: { onChange, onBlur } }) => (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onChange(e.target.files)}
                onBlur={onBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.thumbnail.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Content
          </label>
          <CkEditor name="content" control={control} defaultValue="" />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Date</label>
          <input
            type="date"
            {...register("datetime")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.datetime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.datetime.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
