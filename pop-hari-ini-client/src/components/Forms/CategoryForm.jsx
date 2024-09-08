import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("name is required"),
});

export const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      getCategoryById(id)
        .then((res) => {
          console.log("Fetched category data:", res.data.data);
          reset(res.data.data);
        })
        .catch((err) => {
          console.error("Failed to fetch category", err);
        });
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateCategory(id, { name: data.name });
        alert("Category updated successfully");
      } else {
        await createCategory({ name: data.name });
        alert("Category created successfully");
      }
      navigate("/categories");
    } catch (err) {
      console.error("There was an error!", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        {id ? "Edit Category" : "Create New Category"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {id ? "Update Category" : "Create Category"}
        </button>
      </form>
    </div>
  );
};
