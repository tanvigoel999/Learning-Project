import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
function Signup() {
  // let data = useSelector((state) => state.user);
  // console.log(data);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  let [err, setErr] = useState({ status: false, errMsg: "" });
  const onFormSubmit = (userObj) => {
    //making HTTP POST
    axios
      .post("http://localhost:4000/user/create-user", userObj)
      .then((response) => {
        let message = response.data.message;
        console.log(message);
        if (message === "user created") {
          //navigate to sign in component programatically

          navigate("/signin");
        } else {
          setErr({ ...err, status: true, errMsg: message });
        }
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="container">
      <p className="display-2 text-center">Signup here</p>

      {err.status == true && (
        <p className="text-danger h3 text-center">{err.errMsg}</p>
      )}
      {/* user registration form */}
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {/* username */}
            <div className="mb-3">
              <label for="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                {...register("username", {
                  required: true,
                  minLength: 4,
                  maxLength: 16,
                })}
              />
              {errors.username?.type == "required" && (
                <p className="text-danger">*Username is required..</p>
              )}
              {errors.username?.type == "minLength" && (
                <p className="text-danger">
                  *Username minimum length is 4 required..
                </p>
              )}
              {errors.username?.type == "maxLength" && (
                <p className="text-danger">
                  *Username maximum length is 16 required..
                </p>
              )}
            </div>
            {/* password */}
            <div className="mb-3">
              <label for="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 4,
                  maxLength: 16,
                })}
              />
              {errors.password?.type == "required" && (
                <p className="text-danger">*Password is required..</p>
              )}
              {errors.password?.type == "minLength" && (
                <p className="text-danger">
                  *Password minimum length is 4 required..
                </p>
              )}
              {errors.password?.type == "maxLength" && (
                <p className="text-danger">
                  *Password maximum length is 16 required..
                </p>
              )}
            </div>
            {/* email */}
            <div className="mb-3">
              <label for="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email", { required: true })}
              />
              {errors.email?.type == "required" && (
                <p className="text-danger">*Email is required..</p>
              )}
            </div>
            {/* date of birth */}
            <div className="mb-3">
              <label for="dob" className="form-label">
                Date of birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                {...register("dob", { required: true })}
              />
              {errors.dob?.type == "required" && (
                <p className="text-danger">*Date of Birth is required..</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
// import React from "react";

// const Signup = () => {
//   return (
//     <div className="container">
//       <p className="display-2 text-center">Signup Here</p>
//       <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
//         <div className="col mx-auto">
//           <form>
//             <div className="mb-3">
//               <label for="username" className="form-label">
//                 UserName
//               </label>
//               <input type="text" className="form-control" id="username" />
//             </div>
//             <button type="submit" className="btn btn-primary">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Signup;
