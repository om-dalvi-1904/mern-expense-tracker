import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { changePasswordAPI, updateProfileAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { logoutAction } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Email is required"),
});
const UpdatePassword = () => {
    //! dispatch
    let dispatch = useDispatch()
    //! mutations
    let {mutateAsync, isError, isPending, error, isSuccess} = useMutation({
        mutationFn:updateProfileAPI,
        mutationKey:['update-profile']
      })
    //! formik
    const formik = useFormik({
        initialValues: {
        password: "",
        },
        //! Validations
        validationSchema,
        //!Submit
        onSubmit: (values) => {
            mutateAsync(values).then((data)=>{
                // ? dispatch the action
                dispatch(logoutAction())
                //? remove from local storage
                localStorage.removeItem("userInfo")
                // console.log(values);
                
            }).catch(e=>console.log(e))
        },
    });
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold mb-4">Change Your Password</h2>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>

          {/* Display messages */}
          {isPending && <AlertMessage type="loading" message="Updating..."/>}
          {isError && <AlertMessage type="error" message={error.response.data.message}/>}
          {isSuccess && <AlertMessage type="success" message="Password updated successfully."/>}

          <div className="flex items-center border-2 py-2 px-3 rounded">
            <AiOutlineLock className="text-gray-400 mr-2" />
            <input
              id="new-password"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("password")}
              className="outline-none flex-1"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;