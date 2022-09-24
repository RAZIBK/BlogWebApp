import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchCategoriesAction } from "../../Redux/Slices/category/categorySlice";

function CatrgoryDropDown(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const category = useSelector((state) => state?.category);
  const { categoryList, loading, appErr, serverErr } = category;

  const AllCategory = categoryList?.map((category) => {
    return {
      _id: category?._id,
      label: category?.title,
    };
  }); 

  const handleChange = (value) => {
    props.onChange("category", value);
  };
  const handleBlur = (value) => {
    props.onBlur("category ", true);
  };

  return (
    <div>
      {loading ? (
        <h3 className="text-base text-green-600">
          category list are loading please wait ..{" "}
        </h3>
      ) : (
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          id="category"
          options={AllCategory}
          value={props?.value?.label}
        />
      )}
      {props?.error && (
        <div style={{ color: "red", marginTop: ".5rem" }}> {props?.error}</div>
      )}
    </div>
  );
}

export default CatrgoryDropDown;
