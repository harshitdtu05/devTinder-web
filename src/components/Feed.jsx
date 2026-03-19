import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToFeed } from "../utils/feedSlice";
import UserFeed from "./UserFeed";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (users) return;

    try {
      const userFeed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addToFeed(userFeed?.data?.data));
    } catch (err) {
      navigate("/login");
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return <div>{users && <UserFeed key={users[0]._id} user={users[0]} />}</div>;
};

export default Feed;
