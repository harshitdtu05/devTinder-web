import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFromFeed } from "../utils/feedSlice";

const UserFeed = ({ user }) => {
  const { _id, firstName, lastName, gender, age, about } = user;
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFromFeed(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card card-side bg-base-200 shadow m-auto w-8/12 my-6">
      <figure className="w-5/12">
        <img
          src="https://editorial.rottentomatoes.com/wp-content/uploads/2026/03/EWKA_Spider-Man_Brand_New_Day_Trailer2-Rep.jpg?w=600"
          className="h-full w-full object-cover rounded-l-2xl"
        />
      </figure>

      <div className="card-body w-7/12">
        <h2 className="card-title text-2xl">{firstName + " " + lastName}</h2>
        <p className="text-sm text-gray-400">
          {age}•{gender}
        </p>
        <p className="text-sm mt-2">{about}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="badge badge-outline">Javascript</span>
          <span className="badge badge-outline">ReactJS</span>
          <span className="badge badge-outline">NodeJS</span>
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-error"
            onClick={() => reviewRequest("ignored", _id)}
          >
            ✕ Ignore
          </button>
          <button
            className="btn btn-success"
            onClick={() => reviewRequest("interested", _id)}
          >
            ✓ Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFeed;
