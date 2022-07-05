import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { promiseLifeCycle } from "../slices/userLoginSlice";
import { useNavigate } from "react-router-dom";

function Signin() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { user, isSuccess, isError, errMsg, isPending } = useSelector(
    (state) => state.user
  );

  //form submission
  const onFormSubmit = (userCredObj) => {
    dispatch(promiseLifeCycle(userCredObj));
  };

  useEffect(() => {
    if (isSuccess == true) {
      //navigate to userdashboard
      navigate(`/userdashboard/${user.username}`);
    }
  }, [isSuccess, isError]);

  return (
    <div className="container">
      <p className="display-2 text-center">Login here</p>
      {/* user registration form */}
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 mx-auto">
          {/* invalid credentials messages */}
          {isError && <h2 className="text-danger text-center">{errMsg}</h2>}
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {/* username */}
            <div className="mb-3">
              <label for="username" class="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                {...register("username")}
              />
            </div>
            {/* password */}
            <div className="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password")}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";
// // import { Navigate } from "react-router-dom";
// import { promiseLifeCycle } from "../slices/userLoginSlice";
// import { useNavigate } from "react-router-dom";
// function Signin() {
//   let {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   let dispatch = useDispatch();
//   let navigate = useNavigate();
//   let { isSuccess, isError, errMsg, isPending } = useSelector(
//     (state) => state.user
//   );
//   const onFormSubmit = (userObj) => {
//     //making HTTP POST
//     // console.log(userObj);
//     dispatch(promiseLifeCycle(userObj));
//   };
//   useEffect(() => {
//     if (isSuccess === true) {
//       navigate("/userdashboard");
//     }
//   }, [isSuccess, isError]);
//   return (
//     <div className="container">
//       <p className="display-2 text-center">Login here</p>

//       <div className="row">
//         <div className="col-12 col-sm-8 col-md-6 mx-auto">
//           <form onSubmit={handleSubmit(onFormSubmit)}>
//             {/* username */}
//             <div className="mb-3">
//               <label for="username" className="form-label">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="username"
//                 {...register("username")}
//               />
//             </div>
//             {/* password */}
//             <div className="mb-3">
//               <label for="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 {...register("password")}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// // import React from "react";

// // const Signin = () => {
// //   return (
// //     <div className="container">
// //       <p className="display-2 text-center">Signin Here</p>
// //       <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
// //         <div className="col mx-auto">
// //           <form>
// //             <div className="mb-3">
// //               <label for="username" className="form-label">
// //                 UserName
// //               </label>
// //               <input type="text" className="form-control" id="username" />
// //             </div>
// //             <button type="submit" className="btn btn-primary">
// //               Submit
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// export default Signin;
