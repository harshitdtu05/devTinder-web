import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requestedUsers = useSelector((store) => store.requests);

  const reviewRequests = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const pendingRequests = async () => {
    try {
      const userData = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      console.log(userData?.data?.data);
      dispatch(addRequests(userData?.data?.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err.message);
    }
  };

  useEffect(() => {
    pendingRequests();
  }, []);

  if (!requestedUsers) return <h1 className="text-center mt-10">Loading...</h1>;
  if (requestedUsers.length === 0)
    return <h1 className="text-center mt-10">No Requests Found!</h1>;

  return (
    <div>
      <div className="p-6 ">
        <h1 className="text-2xl font-bold mb-6 text-center">My Connections</h1>
        <div className="flex flex-col gap-4 w-6/12 m-auto">
          {requestedUsers.map((user) => (
            <div
              key={user._id}
              className="card card-side bg-base-200 p-4 flex items-center gap-4 shadow-lg hover:-translate-y-1"
            >
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={user?.photoUrl} alt={user?.firstName} />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="font-bold text-lg">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-xs text-gray-400">• {user?.about}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => reviewRequests("accepted", user._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => reviewRequests("rejected", user._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;
