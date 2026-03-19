import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("mark@devTinder.com");
  const [password, setPassword] = useState("Mark@1234");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const data = res.data;
      dispatch(addUser(data));
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm m-auto bg-gray-500 my-24 bg-opacity-50  shadow-xl">
      <span className="font-bold text-2xl text-center m-2 p-2">Login</span>
      <fieldset className="fieldset mx-auto my-2">
        <legend className="fieldset-legend text-sm">Email ID</legend>
        <input
          type="text"
          value={email}
          className="input bg-white"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </fieldset>
      <fieldset className="fieldset mx-auto my-2">
        <legend className="fieldset-legend text-sm">Password</legend>
        <input
          type="text"
          value={password}
          className="input bg-white"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </fieldset>
      <div className="card-body items-center text-center">
        <div className="card-actions">
          <button
            className="btn btn-primary hover:-translate-y-2"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
