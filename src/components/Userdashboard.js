import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export default function Userdashboard() {
  let { user } = useSelector((state) => state.user);
  const getPrivateData = async () => {
    //get token
    let token = localStorage.getItem("token");
    //and token to header of req
    let response = await axios.get("/user/private-route", {
      headers: { Authorization: token },
    });
    let data = response.data;
    console.log(data);
  };
  return (
    <>
      <h1 className="text-center">Hi {user.username}</h1>
      <button
        className="btn btn-secondary mt-5 d-block mx-auto"
        onClick={getPrivateData}
      >
        {/* <h1>{data.message}</h1> */}
        Get private data
      </button>
    </>
  );
}
