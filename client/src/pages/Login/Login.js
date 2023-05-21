import React, { useState } from "react";
import logoImg from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../signup/Signup.scss";
import { axiosInstance } from "../../utils/axiosInstance";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.data);
        window.location.href = "/home";
        console.log(response.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="SignUp">
      <div className="signUpBox">
        <div className="main-title-div">
          <img src={logoImg} alt="logo" />
          <p>Welcome to Digitalflake Admin</p>
        </div>
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" className="submit" />
        </form>
        <p className="subHeading">
          Don't have an account?{" "}
          <Link style={{ color: "gray" }} to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
