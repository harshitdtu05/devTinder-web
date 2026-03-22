import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("m");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState(true);
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

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res));
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-200 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center mb-4">
            {login ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>

          {!login && (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-xs">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  className="input input-bordered input-sm w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-xs">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  className="input input-bordered input-sm w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-xs">Email ID</span>
            </div>
            <input
              type="email"
              value={email}
              placeholder="Enter your Email"
              className="input input-bordered input-sm w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-xs">Password</span>
            </div>
            <input
              type="password"
              value={password}
              placeholder="Enter your Password"
              className="input input-bordered input-sm w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className="card-actions mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={login ? handleLogin : handleSignUp}
            >
              {login ? "Login" : "Sign Up"}
            </button>
          </div>

          <p className="text-center text-xs mt-2">
            {login ? "Not a User? " : "Already a User? "}
            <span
              className="text-primary cursor-pointer hover:underline font-semibold"
              onClick={() => setLogin(!login)}
            >
              {login ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
