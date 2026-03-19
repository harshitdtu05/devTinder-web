import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ loggedInUser }) => {
  const [updated, setUpdated] = useState(true);
  const [gender, setGender] = useState(loggedInUser?.gender);
  const [age, setAge] = useState(loggedInUser?.age);
  const [about, setAbout] = useState(loggedInUser?.about);
  const [firstName, setFirstName] = useState(loggedInUser?.firstName);
  const [lastName, setLastName] = useState(loggedInUser?.lastName);
  const [photoUrl, setPhotoUrl] = useState(loggedInUser?.photoUrl);
  const dispatch = useDispatch();

  const handleCLick = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          age: age,
          about: about,
          photoUrl: photoUrl,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm w-5/12 m-auto my-6">
      <figure className="w-8/12">
        <img
          src={loggedInUser?.photoUrl || ""}
          alt="Profile"
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </figure>

      <div className="card-body w-8/12 p-3 overflow-y-auto max-h-[500px]">
        <h2 className="card-title text-base mb-1">Edit Profile</h2>

        {/* Inputs with xs size */}
        {updated ? (
          <>
            <p className="text-orange-300 text-xs">First Name</p>
            <input
              type="text"
              value={loggedInUser?.firstName}
              className="input input-bordered input-xs w-full"
              readOnly
            />
            <p className="text-orange-300 text-xs">Last Name</p>
            <input
              type="text"
              value={loggedInUser?.lastName}
              className="input input-bordered input-xs w-full"
              readOnly
            />
          </>
        ) : (
          <>
            <p className="text-orange-300 text-xs">First Name</p>
            <input
              type="text"
              value={firstName}
              className="input input-bordered input-xs w-full"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p className="text-orange-300 text-xs">Last Name</p>
            <input
              type="text"
              value={lastName}
              className="input input-bordered input-xs w-full"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <p className="text-orange-300 text-xs">Email ID</p>
        <input
          type="email"
          value={loggedInUser?.email}
          className="input input-bordered input-xs w-full"
          readOnly
        />

        {updated ? (
          <>
            <p className="text-orange-300 text-xs">Age</p>
            <input
              type="text"
              value={loggedInUser?.age}
              className="input input-bordered input-xs w-full"
              readOnly
            />
            <p className="text-orange-300 text-xs">Gender</p>
            <input
              type="text"
              value={loggedInUser?.gender}
              className="input input-bordered input-xs w-full"
              readOnly
            />
            <p className="text-orange-300 text-xs">About</p>
            <textarea
              value={loggedInUser?.about}
              className="textarea textarea-bordered textarea-xs w-full"
              rows={2}
              readOnly
            />
          </>
        ) : (
          <>
            <p className="text-orange-300 text-xs">Age</p>
            <input
              type="text"
              value={age}
              className="input input-bordered input-xs w-full"
              onChange={(e) => setAge(e.target.value)}
            />
            <p className="text-orange-300 text-xs">Gender</p>
            <select
              className="select select-bordered select-xs w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <p className="text-orange-300 text-xs">About</p>
            <textarea
              value={about}
              className="textarea textarea-bordered textarea-xs w-full"
              onChange={(e) => setAbout(e.target.value)}
              rows={2}
            />
            <p className="text-orange-300 text-xs">Photo URL</p>
            <input
              type="text"
              value={photoUrl}
              className="input input-bordered input-xs w-full"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </>
        )}

        <div className="card-actions justify-end mt-1">
          {updated ? (
            <button
              className="btn btn-primary btn-xs"
              onClick={() => setUpdated(false)}
            >
              UPDATE
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="btn btn-ghost btn-xs"
                onClick={() => setUpdated(true)}
              >
                CANCEL
              </button>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  setUpdated(true);
                  handleCLick();
                }}
              >
                SAVE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
