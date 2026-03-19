import React from "react";

const UserFeed = ({ user }) => {
  const { firstName, lastName, gender, age, about } = user;
  return (
    <div className="card card-side bg-base-200 shadow m-auto w-8/12 my-6">
      <figure className="w-5/12">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
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
          <span className="badge badge-outline">Python</span>
          <span className="badge badge-outline">C++</span>
          <span className="badge badge-outline">AI</span>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-error">✕ Ignore</button>
          <button className="btn btn-success">✓ Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserFeed;
