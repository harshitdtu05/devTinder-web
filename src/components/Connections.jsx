import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsData = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    if (connectionsData) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionsData)
    return <h1 className="text-center mt-10">Loading...</h1>;
  if (connectionsData.length === 0)
    return <h1 className="text-center mt-10">No Connections Found!</h1>;

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-6 text-center">My Connections</h1>
      <div className="flex flex-col gap-4 w-6/12 m-auto">
        {connectionsData.map((user) => (
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

            <button className="btn btn-primary btn-sm">Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
