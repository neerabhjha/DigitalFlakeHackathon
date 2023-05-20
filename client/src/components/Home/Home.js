import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import { SetUser } from "../../redux/userSlice";
import Navbar from "../Navbar/Navbar";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);

  const getCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/api/user/getCurrentUser");
      console.log(response);
      if (response.data.success) {
        console.log(response.data);
        dispatch(SetUser(response.data.data));
      } else {
        console.log(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      navigate("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Home;
