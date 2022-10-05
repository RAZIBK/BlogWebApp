import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CatrgoryDropDown from "../Category/CatrgoryDropDown";
import {
  fetchPostDetails,
  updatePostAction,
} from "../../Redux/Slices/posts/postSlice";
import styled from "styled-components";
import Dropzone from "react-dropzone";

import * as Yup from "yup";
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
});

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  border-color:'red'
  transition: border 0.24s ease-in-out;
`;
export default function UpdatePost() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetails(id));
  }, [id, dispatch]);
  const state = useSelector((state) => state?.post);
  const { PostDetails } = state;
  // console.log(PostDetails?.category);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: PostDetails?.title,
      description: PostDetails?.description,
      category: PostDetails?.category,
      //   image: "",
    },
    onSubmit: (values) => {
      //dispath the action
      const data = {
        category: values?.category?._id,
        title: values?.title,
        description: values?.description,
        id,
      };
      dispatch(updatePostAction(data));
    },
    validationSchema: formSchema,
  });

  const postUpdate = useSelector((state) => state?.post);
  const { loading, appErr, serverErr, postUpdated, isupdatad } = postUpdate;

  if (isupdatad) return <Navigate to={`/posts/${id}`} />;

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Are you sure you want to edit{" "}
            <span className="text-indigo-500 ">{PostDetails?.title}</span>
          </h2>
          {appErr || serverErr ? (
            <h2 className="text-red-500 text-center">
              {appErr}
              {serverErr}
            </h2>
          ) : null}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    onBlur={formik.handleBlur("title")}
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="text-red-500">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>

              <CatrgoryDropDown
                value={formik.values.category?.categoryTitle}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category}
              />
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  rows="5"
                  cols="10"
                  onBlur={formik.handleBlur("description")}
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>
                <div className="text-red-500">
                  {formik.touched.description && formik.errors.description}
                </div>
                {/* <label
                  htmlFor="password"
                  className="block text-sm font-medium mt-3 mb-2 text-gray-700"
                >
                  Select image to upload
                </label>
                <Container className="container bg-gray-700">
                  <Dropzone
                    onBlur={formik.handleBlur("image")}
                    accept="image/jpeg, image/png"
                    onDrop={(acceptedFiles) => {
                      formik.setFieldValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: (event) => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                            Click here to select image
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container> */}
                {/* Err msg */}
                <div className="text-red-500">
                  {formik?.touched?.image && formik.errors?.image}
                </div>
              </div>

              <div>
                {loading ? (
                  <button
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    loading please wait..
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
