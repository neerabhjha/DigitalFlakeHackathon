import React, { useState } from "react";
import logoImg from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./Signup.scss";
import { axiosInstance } from "../../utils/axiosInstance";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/user/signup", {
        name,
        email,
        password,
      });
      if (response.data.success) {
        console.log(response.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="SignUp">
      <div className="signUpBox">
        <div className="main-title-div">
          <img src={logoImg} alt="logo" />
          <p>Welcome to Digitalflake Admin</p>
        </div>
        <h2 className="heading">SignUp</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

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
          Already have an account?{" "}
          <Link style={{ color: "gray" }} to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
