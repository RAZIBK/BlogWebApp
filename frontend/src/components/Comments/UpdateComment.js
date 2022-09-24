import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePostCommentAction,
  fetchSingleCommentAction,
} from "../../Redux/Slices/comments/CommentSlice";
import * as Yup from "yup";

const formSchema = Yup.object({
  description: Yup.string().required("Title is required"),
});

export default function UpdateComment({ id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleCommentAction(id));
  }, []);

  const state = useSelector((state) => state?.comment);
  const { singleComment } = state;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: singleComment?.description,
    },
    onSubmit: (values) => {
      const data = {
        description: values?.description,
        id,
      };
      dispatch(updatePostCommentAction(data));
    },
    validationSchema: formSchema,
  });

  return (
    <div className="relative text-gray-700">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <div class="relative text-gray-700">
          <input
            id="description"
            name="description"
            type="description"
            autoComplete="description"
            onBlur={formik.handleBlur("description")}
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            className="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          />
          <button
            type="submit"
            class="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-500 focus:bg-indigo-700"
          >
            Click
          </button>
        </div>
        <div className="text-red-500">
          {formik.touched.title && formik.errors.description}
        </div>
      </form>
    </div>
  );
}
