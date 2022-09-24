import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createCommentAction,
  reset,
} from "../../Redux/Slices/comments/CommentSlice";
import { useDispatch } from "react-redux";

//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   reset({
  //     description: ' '
  //   })
  // },[dispatch])

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: (values, { resetForm }) => {
      const data = {
        postId,
        description: values?.description,
      };
      dispatch(createCommentAction(data));
      resetForm({ values: "" });
    },
    validationSchema: formSchema,
  });
  return (
    <div className="mx-auto  justify-center items-center">
      <h1 className="text-2xl my-8 text-bold">Leave a Comment</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-1 flex min-w-sm m-auto"
      >
        <textarea
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          type="text"
          name="text"
          rows="5"
          id="text"
          className="shadow-sm focus:ring-indigo-500   mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md bg-gray-100"
          placeholder="Add New comment"
        />

        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      <div className="text-red-400 mb-2 mt-2">
        {formik.touched.description && formik.errors.description}
      </div>
    </div>
  );
};

export default AddComment;
